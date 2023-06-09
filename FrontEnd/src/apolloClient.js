import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://biographql.onrender.com/test', // Make sure this is the correct server endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token); // Log the token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
