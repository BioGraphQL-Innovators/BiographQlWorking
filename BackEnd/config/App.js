import express, { json } from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import UserTypeDefs from '../models/User.graphql.js';
import { userResolver } from '../resolvers/User.js';
import { patientResolver } from '../resolvers/Patient.js';
import PatientTypeDefs from '../models/Patient.graphql.js';
import { createRequire } from 'module';
import { getUserFromToken } from '../utils/auth.js';

const require = createRequire(import.meta.url);
const expressJwt = require('express-jwt');

const { connect, connection } = mongoose;

//app
const app = express();

//environment variables
dotenv.config();
const jwtSecret = process.env.JWTSECRET;
connect(process.env.APP_DATABASE_URL, {
  useNewUrlParser: true,
});
const db = connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

app.use(json());
app.use(cors());

const jwtMiddleware = expressJwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  credentialsRequired: false,
});

app.use(jwtMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = resolve(__dirname, '../views');

const typeDefs = [UserTypeDefs, PatientTypeDefs];
const resolvers = [userResolver, patientResolver];

const schema = makeExecutableSchema({ typeDefs, resolvers });

const context = ({ req }) => {
  const token = req.headers.authorization || '';
  const user = getUserFromToken(token);
  return { user };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
  },
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer();

app.set('views', viewsPath);
app.set('view engine', 'ejs');

export default app;
