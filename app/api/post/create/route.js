import Post from '@models/posts';
import { connectToDatabase } from '@utils/connectDB';

export const POST = async (req, res) => {
  try {
    const { userId, post, tag } = await req.json();
    console.log("🚀 ~ file: route.js:7 ~ POST ~  userId, post, tag:",  userId, post, tag);

    await connectToDatabase();

    const newPost = new Post({
      post: post,
      tag,
      creator: userId,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error creating post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
