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
import { Vitals as VitalsTypeDefs } from '../models/Vitals.graphql.js';
import { vitalsResolvers } from '../resolvers/Vitals.js';
import { GraphQLDateTime } from 'graphql-scalars';

const require = createRequire(import.meta.url);
const { DateTime } = require('graphql-scalars');
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
  getToken: function fromHeaderOrQuerystring(req) {
    // Log the token
    console.log('Token from headers:', req.headers.authorization);
    return req.headers.authorization;
  },
}).unless({ path: ['/graphql'] }); // Add this line to exclude the '/graphql' path from jwtMiddleware

app.use(jwtMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = resolve(__dirname, '../views');

const typeDefs = [UserTypeDefs, PatientTypeDefs, VitalsTypeDefs];
const resolvers = [
  {
    Date: GraphQLDateTime,
  },
  userResolver,
  patientResolver,
  vitalsResolvers,
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

const context = ({ req }) => {
  const token = req.headers.authorization || '';
  console.log('Token from headers:', token);
  const user = getUserFromToken(token);
  console.log('User from token:', user);
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
const expressGraphQL = require('express-graphql').graphqlHTTP
app.use('/test',cors(), expressGraphQL({
  schema: schema,
  graphiql: true
  }));
export default app;
