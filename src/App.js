import ExchangeRateView from "./view"
import { colors } from "./styles"
import React from "react"
import { View, StyleSheet } from "react-native"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: `https://v7mnw3m03.lp.gql.zone/graphql`,
  clientState: {
    defaults: {
      rates: {
        __typename: `Currency`,
        currency: `BTC`
      }
    },
    resolvers: {
      Mutation: {
        setRate: (_, { currency }, { cache }) => {
          cache.writeData({
            data: {
              rates: {
                __typename: `Currency`,
                currency: currency
              }
            }
          })
          return null
        }
      }
    }
  }
})

const App = () =>
  <ApolloProvider client={client}>
    <View style={styles.container}>
      <ExchangeRateView />
    </View>
  </ApolloProvider>

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.darkBlue
  }
})

export default App