import React from 'react';
import ReactDOM from 'react-dom';
import AppSyncConfig from './aws-exports';
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import App from './App';

const config = {
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey,
  },
};

const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(config),
    createSubscriptionHandshakeLink(config),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
