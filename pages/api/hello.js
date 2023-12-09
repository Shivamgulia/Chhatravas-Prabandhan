// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import verifyToken from '../../components/jwt/verifyToken';

export default function handler(req, res) {
  const token = req.headers.authorization;

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
  res.status(200).json({ name: 'John Doe' });
}
