import User from '../models/User.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from 'apollo-server-express';

dotenv.config();
const jwtSecret = process.env.JWTSECRET;

export const userResolver = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    checkToken: async (parent, args, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      try {
        const userData = await User.findById(user.id).select('-password');
        return userData;
      } catch (error) {
        console.error(error.message);
        throw new Error('Server Error');
      }
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const { email, password, role } = input;

      try {
        let user = await User.findOne({ email });

        if (user) {
          throw new UserInputError('User already exists');
        }

        user = new User({ email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } catch (error) {
        throw error;
      }
    },
    loginUser: async (_, { input }) => {
      const { email, password } = input;

      let user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        });
      });
    },
  },
};
