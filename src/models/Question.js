import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    alternatives: [
      {
        id: { type: Number, min: 1, required: true },
        description: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    correct: { type: Number, min: 1, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    active: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  },
);
QuestionSchema.path('alternatives').validate(
  alternatives => alternatives.length > 2,
);

QuestionSchema.pre('save', async function preSaveq() {
  this.categories.forEach((element) => {
    console.log('categoria =>', element);
  });
});

export default model('Question', QuestionSchema);
