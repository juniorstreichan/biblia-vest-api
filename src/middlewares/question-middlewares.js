/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';
import messages from '../configs/messages';
import { noBodyRequest } from './commons-middlewares';

const newQuestionSchema = yup.object().shape({
  description: yup.string().required(messages.questionDescriptionRequired),
  alternatives: yup
    .array(
      yup.object().shape({
        id: yup.number().min(1),
        description: yup.string().required(messages.questionDescriptionRequired),
      }),
    )
    .min(2, messages.questionAlternativesMin),
  correct: yup.number().min(1, messages.questionCorrectInvalid),
  categories: yup.array(yup.string()).min(1, messages.questionCategoriesMin),
  active: yup.bool(),
});

const updateQuestionSchema = yup.object().shape({
  _id: yup.string().required(messages.questionIdRequired),
  description: yup.string().required(messages.questionDescriptionRequired),
  alternatives: yup
    .array(
      yup.object().shape({
        id: yup.number().min(1),
        description: yup.string().required(messages.questionDescriptionRequired),
      }),
    )
    .min(2, messages.questionAlternativesMin),
  correct: yup.number().min(1, messages.questionCorrectInvalid),
  categories: yup.array(yup.string()).min(1, messages.questionCategoriesMin),
  active: yup.bool(),
});

const newCategorySchema = yup.array(
  yup.object().shape({
    name: yup.string().required(messages.categoryNameRequired),
  }),
);

/* ################################################################################# */

export async function newQuestionMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: messages.requestInvalid });
  }
  try {
    await newQuestionSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}

export async function updateQuestionMiddleware(req, res, next) {
  /* istanbul ignore next */
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: messages.requestInvalid });
  }
  try {
    await updateQuestionSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}

export async function newCategoryMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: messages.requestInvalid });
  }
  try {
    await newCategorySchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}
