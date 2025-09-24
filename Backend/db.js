import mongoose from 'mongoose';

async function db() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log(`\nMongodb connected || ${connection.connection.host}`);
  } catch (err) {
    console.error('error in connecting mongodb');
  }
}

export default db;
