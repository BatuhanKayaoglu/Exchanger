import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useGetUserQuery} from '../store/apis/exchangeApi';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native'; 
import ExchangeCard from './ExchangeCard';

export default function ExchangeList() {

    const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
    const { data: exchangeInfo, error, isLoading,isFetching } = useGetUserQuery(selectedCurrency);
    
    if (isFetching) return <ActivityIndicator style={styles.loader} size="large" color="#FE2266" />;
    if (error) return <Text>Error fetching data</Text>;
    if (!exchangeInfo?.conversion_rates) return <Text>No exchange data available</Text>;

  const exchangeRatesArray = Object.entries(exchangeInfo.conversion_rates).map(([currency, rate]) => ({
    currency,
    rate,
  }));

  return (
    <View>
      <FlatList
        data={exchangeRatesArray}
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => <ExchangeCard currency={item.currency} rate={item.rate} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    loader: {
        marginTop: 20,
        transform: [{ scale: 3 }],
    },
})