import Post from '@models/posts';
import { connectToDatabase } from '@utils/connectDB';

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const posts = await Post.findOne({ _id: params.id }).populate('creator');
    if (!posts) return new Response('Post not found', { status: 404 });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch post', { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    const { post, tag } = await req.json();
    await connectToDatabase();

    const posts = await Post.findOne({ _id: params.id });
    if (!posts) return new Response('Post not found', { status: 404 });

    posts.tag = tag;
    posts.post = post;

    await posts.save();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update post', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();

    const deletedPost = await Post.findByIdAndDelete(params.id);

    if (!deletedPost) {
      return new Response('Post not found', { status: 404 });
    }

    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete post', { status: 500 });
  }
};
