import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import messages from '../configs/messages';
import logger from '../tools/logger';

export default async function jwtAuthenticationMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'No token' });

  const [bearer, token] = [...authHeader.split(' ')];

  if (!/^Bearer$/i.test(bearer)) return res.status(401).send({ message: messages.jwtTokenMalformatted });
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_APP_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    logger.warn(messages.jwtTokenInvalid);
    return res.status(401).send({ message: messages.jwtTokenInvalid });
  }
}
