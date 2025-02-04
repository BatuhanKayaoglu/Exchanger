import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import exchangeRateInfo from '../exchangeInfo.json';
import { setCurrency } from '../store/slices/currencySlice'; 
import { useDispatch, useSelector } from "react-redux";


const ExchangeSelector = () => {
  const [selectedExchange1, setSelectedExchange1] = useState("USD");
  const [selectedExchange2, setSelectedExchange2] = useState("EUR");

  // const currencyInfo = useSelector((state) => state.currency.selectedCurrency);

  const handleSwap = () => {
    setSelectedExchange1(selectedExchange2);
    setSelectedExchange2(selectedExchange1);
  };

  const dispatch = useDispatch();
  
  const handleCurrencyChange = (currency) => {
    console.log("currencyCHANGE: "+ currency);
    dispatch(setCurrency(currency)); 
  };

  useEffect(() => {
    dispatch(setCurrency(selectedExchange1));
  }, [selectedExchange1, dispatch]);

  return (
    <View style={styles.container}>
      {/* Soldaki Select */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedExchange1}
          onValueChange={handleCurrencyChange}
          style={styles.picker}
          
        >
        {Object.entries(exchangeRateInfo).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={key} />
        ))}
        </Picker>
      </View>

      {/* Ortadaki Takas İkonu */}
      <MaterialIcons name="swap-horiz"
       size={45}
        color="#FE2266"
         style={{ marginHorizontal: 20 }}
         onPress={handleSwap}
         />

      {/* Sağdaki Select */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedExchange2}
          onValueChange={(itemValue) => setSelectedExchange2(itemValue)}
          style={styles.picker}
        >
          {Object.entries(exchangeRateInfo).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={key} />
        ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    borderRadius: 8,
    overflow: "hidden", // Taşan gölge efektlerini temizler


    ...Platform.select({
      ios: {
        shadowColor: "#2B2B2B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },


    }),
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExchangeSelector;
