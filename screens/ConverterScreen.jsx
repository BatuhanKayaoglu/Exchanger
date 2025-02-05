import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ExchangeSelector from '../components/ExchangeSelecter'
import {useGetUserQuery} from '../store/apis/exchangeApi';
import { useSelector } from 'react-redux';


export default function ConverterScreen() {

  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
  const secondCurrency = useSelector((state) => state.currency.secondCurrency);
  const { data: exchangeInfo, error, isLoading,isFetching } = useGetUserQuery(selectedCurrency);

  const exchangeRate = exchangeInfo.conversion_rates[secondCurrency];
  console.log(exchangeRate);

  const [count, setCount] = useState(0);

  const handleInputChange = (text) => {
    const newValue = text === "" ? 0 : parseInt(text, 10);
    if (!isNaN(newValue)) {
      setCount(newValue);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>  

      <View style={styles.mainConverter}>
        <ExchangeSelector />
      </View>

      <View style={styles.mainConverter}>

        <View style={styles.exchangeContainer}>
          <Text style={[styles.exchangeFirst, { color: '#FE2266' }]}>{selectedCurrency}</Text>
          <Text style={styles.bol}>|</Text>
          <Text style={[styles.exchangeFirst, { color: '#E4B72B' }]}>{secondCurrency}</Text>
        </View>

        <View style={styles.exchangeCounter}>

            <TextInput
            style={styles.input}
            value={count.toString()}
            keyboardType="numeric"
            onChangeText={handleInputChange}
            />

          <TouchableOpacity style={styles.minusButton} onPress={() => setCount(count - 1)} disabled={count === 0}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.plusButton} onPress={() => setCount(count + 1)}>
            <Text style={[styles.buttonText,{fontSize:18}]}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.convertButton} >
          <Text style={styles.convertText}>Convert</Text>
        </TouchableOpacity>

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
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'flex-start',
    
 },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },

  converterText: {
    fontSize: 18,
    color: 'white',
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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
  },

  exchangeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap : 20
  },

  exchangeFirst: {
    fontSize: 20,
    color: '#ffffff',
  },
  bol: {
    fontSize: 20,
    color: '#ffffff',
  },

  exchangeCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:30
  },

  input: {
    fontSize: 16,
    width: '100%',
    height: 50,
    color: '#ffffff',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10, 
    backgroundColor: '#2B2B2B',
  },
  minusButton: {
    padding: 5,
    borderRadius: 10,
    position: 'relative',
    right: 60,
  },

  plusButton: {
    padding: 5,
    borderRadius: 10,
    position: 'relative',
    right: 50,
  },

  buttonText: {
    fontSize: 34,
    color: '#ffffff',
  },
  convertButton:{
    backgroundColor: '#FE2266',
    padding: 8,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  convertText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },

})