import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const GqlHello = () => (
  <Query query={gql` { hello } `} >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.hello;
    }}
  </Query>
);

const ApolloTest = () => (
  <ApolloProvider client={client}>
  <div>
    <h2>Apollo is working</h2>
    <GqlHello />
  </div>
  </ApolloProvider>
);

ReactDOM.render(<div><App /><ApolloTest /></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
