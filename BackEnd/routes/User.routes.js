import { Router } from 'express';
import {
  getAllUsers,
  registerUser,
  loginUser,
  checkToken,
} from '../controllers/User.controller.js';
import auth from '../middleware/auth.js';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
//user Name property

userRouter.get('/check-token', auth, checkToken);
userRouter.route('/auth').post(loginUser);
userRouter.route('/register').post(registerUser);

export default userRouter;
