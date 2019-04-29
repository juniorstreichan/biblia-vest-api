import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
export async function connect() {
  const url = await mongod.getConnectionString();

  console.log('url', url);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}

export function drop() {}
