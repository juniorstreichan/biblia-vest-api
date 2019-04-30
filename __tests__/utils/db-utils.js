import mongoose from 'mongoose';

export async function connectMongoDBTest() {
  const mongoUri = 'mongodb://127.0.0.1:27017/tests';
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
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}
