import React from 'react';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri:
		process.env.NODE_ENV === 'production'
			? 'https://shopify-code-challenge-backend.herokuapp.com/'
			: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ApolloProvider>
);
