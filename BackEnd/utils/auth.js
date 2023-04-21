import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWTSECRET;

const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
    return decoded.user;
  } catch (error) {
    return null;
  }
};

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  const user = await getUserFromToken(token);

  if (!user) {
    return res.status(401).json({ msg: 'No token, authentication denied' });
  }

  req.user = user;
  next();
};

export { auth, getUserFromToken };
