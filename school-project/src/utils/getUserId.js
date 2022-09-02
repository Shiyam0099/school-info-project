import JWT from 'jsonwebtoken';
import { secretKey } from '../keys';

const getUserId = (request, requireAuth = true) => {
  const header = request.request.headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = JWT.verify(token, secretKey);
    return decoded.id;
  }
  if (requireAuth) {
    throw new Error('Authentication required!');
  }

  return null;
};

export { getUserId as default };
