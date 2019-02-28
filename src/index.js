import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { AUTH_TOKEN } from './constants';

// import required dependencies
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// connects apolloclient instance with graphql qpi
// graphql server will be running on port 4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

//This middleware will be invoked every time ApolloClient sends a request to the server.
// Apollo Links allow you to create middlewares that let you modify requests before they are sent to the server.
// first, we get the authentication token from localStorage if it exists;
// after that, we return the headers to the context so httpLink can read them.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// render the root component of your React app
// The App is wrapped with the higher-order component ApolloProvider that gets passed the client as a prop
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
