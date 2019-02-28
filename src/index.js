import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// import required dependencies
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// connects apolloclient instance with graphql qpi
// graphql server will be running on port 4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

// instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache
const client = new ApolloClient({
  link: httpLink,
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
