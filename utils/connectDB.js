import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    console.log('🚀🚀🚀Connecting to database...');

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'ByteNotes',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('🌿 MongoDB connected');
  } catch (error) {
    console.log('Connection error: ❌❌❌');
    console.log(error);
  }
};
