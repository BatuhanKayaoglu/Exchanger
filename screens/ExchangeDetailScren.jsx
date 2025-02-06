import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const getRandomRateChange = (rate) => {
  const percentageChange = (Math.random() * 15 + 5) / 100; // %5 ile %20 arası
  const isIncrease = Math.random() > 0.5; // Artış mı azalış mı?
  return isIncrease
    ? rate * (1 + percentageChange)
    : rate * (1 - percentageChange);
};

// Son 10 gün
const generateExchangeRates = (rate) => {
  const rates = [];
  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    rates.push({
      date: date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
      }), // Gün/Ay formatı
      rate: parseFloat(getRandomRateChange(rate).toFixed(2)), //
    });
  }
  return rates;
};

export default function ExchangeDetailScren({ route }) {
  const { rate, title } = route.params;
  const exchangeRates = generateExchangeRates(rate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} Kuru</Text>
      <LineChart
        data={{
          labels: exchangeRates.map((item) => item.date),
          datasets: [{ data: exchangeRates.map((item) => item.rate) }],
        }}
        width={Dimensions.get("window").width - 30}
        height={320}
        yAxisLabel="₺"
        chartConfig={{
          backgroundGradientFrom: "#1e1e1e",
          backgroundGradientTo: "#121212",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 10 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#00FFFF" },
        }}
        bezier
        style={{ marginVertical: 10, borderRadius: 10 }}
      />

      <View style={styles.changeContainer}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>En Yüksek</Text>
          <Text style={styles.boxText}>
            ₺{Math.max(...exchangeRates.map((e) => e.rate)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>En Düşük</Text>
          <Text style={styles.boxText}>
            ₺{Math.min(...exchangeRates.map((e) => e.rate)).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.currentRateContainer}>
        <Text style={styles.boxTitle}>Anlık Kur Oranı</Text>    
        <Text style={styles.currentRate}>₺{rate.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  changeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  box: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom: 5,
  },
  boxText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  percentage: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  up: {
    color: "#00FF00", // Yeşil (Fiyat yükselince)
  },
  down: {
    color: "#FF0000", // Kırmızı (Fiyat düşünce)
  },
  updateTime: {
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
    marginTop: 5,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  currentRateContainer:{
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  currentRate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
});
