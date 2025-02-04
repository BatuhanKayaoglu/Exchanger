import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetExchangesQuery } from '../store/apis/exchangeApi'
import ExchangeCard from '../components/ExchangeCard';
import ExchangeSelecter from '../components/ExchangeSelecter';
import ExchangeList from '../components/ExchangeList';


export default function HomeScreen() {

    const { data, error, isLoading } = useGetExchangesQuery();

    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (error) {
      return <Text>Veri alınırken hata oluştu.</Text>;
    }
  
    const exchangeRatesArray = Object.entries(data.conversion_rates).map(([currency, rate]) => ({
      currency,
      rate,
    }));
  
    return (
      <View style={styles.container}> 
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff", marginBottom: 10, textAlign:"center" }}>Currency Exchanges</Text>  
      <ExchangeSelecter/>
      <ExchangeList/>
      </View>
   
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    padding: 14,
  },
})