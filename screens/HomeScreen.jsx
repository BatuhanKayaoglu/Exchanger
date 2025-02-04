import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExchangeSelecter from '../components/ExchangeSelecter';
import ExchangeList from '../components/ExchangeList';


export default function HomeScreen() {

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