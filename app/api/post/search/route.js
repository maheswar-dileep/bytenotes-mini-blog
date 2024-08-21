import Post from '@models/posts';
import { connectToDatabase } from '@utils/connectDB';

export const GET = async (req, res) => {
  try {
    const url = new URL(req.url);
    const searchText = url.searchParams.get('searchText');

    await connectToDatabase();

    let posts;
    if (searchText === '') posts = await Post.find().populate('creator');
    else
      posts = await Post.find({
        tag: { $regex: searchText, $options: 'i' },
      }).populate('creator');

    if (!posts) return new Response('Post not found', { status: 404 });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch post', { status: 500 });
  }
};
