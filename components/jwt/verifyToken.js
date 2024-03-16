import { verify } from 'jsonwebtoken';

const verifyToken = (token) => {
  try {
    const decoded = verify(token.replace('Bearer ', ''), 'havefuneveryone');
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
};

export default verifyToken;
