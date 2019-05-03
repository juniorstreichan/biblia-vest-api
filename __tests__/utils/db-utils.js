import mongoose from 'mongoose';
import dotenvConfig from '../../src/configs/dotenv-config';

dotenvConfig();

export async function connectMongoDBTest() {
  const version = new Date().getMilliseconds().toString();
  jest.setTimeout(60000);
  const mongoUri = `${process.env.DATABASE_TEST_CONNECTION}-${version}`;
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
  };
  console.log('mongoUri => ', mongoUri);
  await mongoose.connect(mongoUri, mongooseOpts);
}

export async function disconnectMongoDBTest() {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}
