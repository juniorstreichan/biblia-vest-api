import { Error, model, Schema } from 'mongoose';
import messages from '../configs/messages';

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
async function preSave() {
  const correctAlt = this.alternatives.filter(alt => alt.id === this.correct);

  if (correctAlt.length < 1) {
    throw new Error(messages.questionCorrectNotFound);
  }

  if (this.categories.length < 1) {
    throw new Error(messages.questionCategoriesMin);
  }
}

QuestionSchema.path('alternatives').validate((alternatives) => {
  let noRepeat = true;
  alternatives.forEach((alt) => {
    const countID = alternatives.filter(a => a.id === alt.id);
    if (countID.length > 1) {
      noRepeat = false;
    }
  });
  return alternatives.length > 2 && noRepeat;
}, messages.questionAlternativesRepetedId);

QuestionSchema.pre('save', preSave);
QuestionSchema.pre('update', preSave);

export default model('Question', QuestionSchema);
