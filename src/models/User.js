import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
/**
 * @swagger
 *
 * definitions:
 *  User:
 *    type: object
 *    required:
 *      - name
 *      - email
 *      - password
 *    properties:
 *       name:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 */
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    rules: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

UserSchema.pre('save', async function preSave() {
  const pass = this.password;
  const hash = await bcryptjs.hash(pass.toString(), 10);
  this.rules = ['default'];
  this.password = hash;
});

export default model('User', UserSchema);
