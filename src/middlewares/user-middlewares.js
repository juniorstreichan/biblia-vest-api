import * as yup from 'yup';
import messages from '../configs/messages';
import { noBodyRequest } from './commons-middlewares';
import logger from '../tools/logger';

const userSchema = yup.object().shape({
  name: yup.string().required(messages.userNameRequired),
  email: yup
    .string()
    .email(messages.userEmailInvalid)
    .required(messages.userEmailRequired),
  password: yup
    .string()
    .required(messages.userPassRequired)
    .min(8, messages.userPassInvalid),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(messages.userEmailInvalid)
    .required(messages.userEmailRequired),
  password: yup
    .string()
    .min(8, messages.userPassInvalid)
    .required(messages.userPassRequired),
});

export async function newUserMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: messages.requestInvalid });
  }
  try {
    await userSchema.validate(req.body);
    return next();
  } catch (error) {
    logger.warn(error.message);
    return res.status(422).send({ message: error.message });
  }
}

export async function loginMiddleware(req, res, next) {
  if (noBodyRequest(req)) {
    return res.status(400).send({ message: messages.requestInvalid });
  }
  try {
    await loginSchema.validate(req.body);
    return next();
  } catch (error) {
    logger.warn(error.message);
    return res.status(422).send({ message: error.message });
  }
}
