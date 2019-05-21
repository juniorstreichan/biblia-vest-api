import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Category', CategorySchema);
