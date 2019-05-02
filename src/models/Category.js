import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
});

export default model('Category', CategorySchema);
