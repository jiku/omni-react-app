import React from "react";
import { View, StyleSheet } from "react-native";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import ExchangeRateView from "./view";
import { colors } from "./styles";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://v7mnw3m03.lp.gql.zone/graphql`
  }),
  cache: new InMemoryCache()
  // for SSR, use:
  // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

const App = () => (
  <ApolloProvider client={client}>
    <View id="root" style={styles.container}>
      <ExchangeRateView />
    </View>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  container: {
    height: "100%", // "100vh",
    backgroundColor: colors.darkBlue
  }
});

export default App