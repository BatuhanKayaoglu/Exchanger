import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";

export default function ExchangeCard({ currency, rate }) {
  const selectedCurrency = useSelector(
    (state) => state.currency.selectedCurrency
  );

  var navigation = useNavigation();

  const randomChange = (Math.random() * 10 - 5).toFixed(2);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ExchangeDetail", { title: currency, rate: rate })
      }
    >
      <View style={styles.exchangeInfo}>
        <Text style={styles.exchangeName}>{currency}</Text>
        <Text style={styles.exchangeData}>{rate}</Text>
      </View>
      <View style={styles.exchangeMiniInfo}>
        <Text style={styles.exchangeMiniName}>
          1 {currency} = {rate} {selectedCurrency}{" "}
        </Text>
        <Text style={styles.exchangeMiniData}>{randomChange}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#2B2B2B",
  },

  exchangeName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  exchangeData: {
    fontSize: 20,
    color: "#BB981E",
  },
  exchangeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exchangeMiniInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  exchangeMiniName: {
    color: "#666561",
  },
  exchangeMiniData: {
    color: "#FE2266",
    fontSize: 14,
  },
});
