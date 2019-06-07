import * as yup from 'yup';
import messages from '../configs/messages';
import { noBodyRequest } from './commons-middlewares';
import logger from '../tools/logger';

/**
 * @swagger
 *
 * definitions:
 *  Alternative:
 *      type: object
 *      required:
 *        - description
 *      properties:
 *        id:
 *          type: number
 *        description:
 *          type: string
 */
const alternativeSchema = yup.object().shape({
  id: yup.number().min(1),
  description: yup.string().required(messages.questionDescriptionRequired),
});

/**
 * @swagger
 *
 * definitions:
 *  NewQuestion:
 *   type: object
 *   required:
 *     - description
 *   properties:
 *     description:
 *       type: string
 *     alternatives:
 *       type: array
 *       items:
 *         $ref: '#/definitions/Alternative'
 *     correct:
 *       type: boolean
 *     active:
 *       type: boolean
 *     categories:
 *       type: array
 *       items:
 *         type: string
 */
const newQuestionSchema = yup.object().shape({
  description: yup.string().required(messages.questionDescriptionRequired),
  alternatives: yup
    .array(alternativeSchema)
    .required(messages.questionAlternativesMin)
    .min(2, messages.questionAlternativesMin),
  correct: yup.number().min(1, messages.questionCorrectInvalid),
  categories: yup.array(yup.string()).min(1, messages.questionCategoriesMin),
  active: yup.bool(),
});

/**
 * @swagger
 *
 * definitions:
 *  Question:
 *    allOf:
 *      - $ref: '#/definitions/NewQuestion'
 *      - required:
 *        - _id
 *      - properties:
 *         _id:
 *          type: string
 */
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

/**
 * @swagger
 *
 * definitions:
 *  Category:
 *   allOf:
 *     - $ref: '#/definitions/NewCategory'
 *     - required:
 *       - _id
 *     - properties:
 *        _id:
 *         type: string
 *
 *  NewCategory:
 *   type: object
 *   required:
 *     - name
 *   properties:
 *     name:
 *       type: string
 */
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
    logger.warn(error.message);
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
    logger.warn(error.message);
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
    logger.warn(error.message);
    return res.status(422).send({ message: error.message });
  }
}
