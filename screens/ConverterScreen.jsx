import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExchangeSelector from '../components/ExchangeSelecter'
import {useGetUserQuery} from '../store/apis/exchangeApi';
import { useSelector } from 'react-redux';


export default function ConverterScreen() {

  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
  const secondCurrency = useSelector((state) => state.currency.secondCurrency);
  const { data: exchangeInfo, error, isLoading,isFetching } = useGetUserQuery(selectedCurrency);

  const exchangeRate = exchangeInfo.conversion_rates[secondCurrency];
  console.log(exchangeRate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>  

      <View style={styles.mainConverter}>
        <ExchangeSelector />
      </View>

      <View>
        <Text style={styles.converterText}>
          1 {selectedCurrency} = {exchangeRate} {secondCurrency}
        </Text>
        <Text style={styles.reverseConverterText}>
          1 {secondCurrency} = {(1 / exchangeRate).toFixed(4)} {selectedCurrency}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
     justifyContent: 'center',
      alignItems: 'center'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },

  converterText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },

  mainConverter: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
})