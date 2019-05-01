import mongoose from 'mongoose';
import dotenvConfig from '../../src/configs/dotenv-config';

dotenvConfig();

export async function connectMongoDBTest() {
  jest.setTimeout(60000);
  const mongoUri = process.env.DATABASE_TEST_CONNECTION;
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
  };
  console.log('mongoUri => ', mongoUri);
  await mongoose.connect(mongoUri, mongooseOpts, async () => {
    /* Drop the DB */
    await mongoose.connection.db.dropDatabase();
  });
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
  await mongoose.connection.dropCollection('users');
  await mongoose.disconnect();
}
