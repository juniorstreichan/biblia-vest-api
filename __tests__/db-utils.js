import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();
export async function connectMongoDBTest() {

  const mongoUri = await mongoServer.getConnectionString();
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
  };
  console.log('mongoUri => ', mongoUri);
  await mongoose.connect(mongoUri, mongooseOpts);
  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log('ERRO =>', e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}

export async function disconnectMongoDBTest() {
  mongoose.disconnect();
  await mongoServer.stop();
}
