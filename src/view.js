import ExchangeRateList from "./list"
import { colors, fontSize } from "./styles"
import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'

const onCurrencyChange = mutate => currency => e => mutate({ variables: { currency }})

const ExchangeRateView = ({ data: { loading, rates }, mutate }) =>
  !loading?
    <View style={styles.container}>
      <Text style={styles.heading}>{`1 ${rates.currency}`}</Text>
      <ExchangeRateList currency={rates.currency} onCurrencyChange={onCurrencyChange(mutate)} />
    </View>
  :
    <ActivityIndicator color={colors.teal} />

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  heading: {
    fontSize: fontSize.large,
    fontWeight: "200",
    color: colors.white,
    letterSpacing: 6
  }
})

const GET_RATES = gql`
  query rates {
    rates @client {
      currency
    }
  }
`

const SET_RATE = gql`
  mutation setRate($currency: Currency) {
    setRate(currency: $currency) @client
  }
`

export default compose(
  graphql(GET_RATES),
  graphql(SET_RATE)
)(ExchangeRateView)