import * as yup from 'yup';

const msgErros = {
  emailInvalid: 'Email inválido',
  emailRequired: 'Email obrigatório',
  nameRequired: 'Nome é obrigatório',
  passRequired: 'Senha é obrigatória',
  passInvalid: 'Senha inválida, mínimo 8 caracteres',
};

const userSchema = yup.object().shape({
  name: yup.string().required(msgErros.nameRequired),
  email: yup
    .string()
    .email(msgErros.emailInvalid)
    .required(msgErros.emailRequired),
  password: yup
    .string()
    .required(msgErros.passRequired)
    .min(8, msgErros.passInvalid),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(msgErros.emailInvalid)
    .required(msgErros.emailRequired),
  password: yup
    .string()
    .min(8, msgErros.passInvalid)
    .required(msgErros.passRequired),
});

export async function newUserMiddleware(req, res, next) {
  if (!req.body || Object.keys(req.body).length <= 0) {
    return res.status(400).send({ message: 'Requisição inválida' });
  }
  try {
    await userSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}

export async function loginMiddleware(req, res, next) {
  if (!req.body || Object.keys(req.body).length <= 0) {
    return res.status(400).send({ message: 'Requisição inválida' });
  }
  try {
    await loginSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
}
