import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    rules: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

// eslint-disable-next-line func-names
UserSchema.pre('save', async function () {
  const hash = await bcryptjs.hash(this.password, 10);
  this.rules.push = 'default';
  this.password = hash;
});

export default model('User', UserSchema);
