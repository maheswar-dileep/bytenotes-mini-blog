import Post from '@models/posts';
import { connectToDatabase } from '@utils/connectDB';

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const posts = await Post.find({ creator: params.id }).populate('creator');
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch posts', { status: 500 });
  }
};
