import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function HistoryScreen() {
  const exchangeRates = [
    { date: "02-01", rate: 28.5 },
    { date: "02-02", rate: 28.7 },
    { date: "02-03", rate: 28.6 },
    { date: "02-04", rate: 28.9 },
    { date: "02-05", rate: 29.1 },
    { date: "02-06", rate: 29.1 },
    { date: "02-07", rate: 28.5 },
    { date: "02-08", rate: 28.4 },
    { date: "02-09", rate: 28.8 },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: "#00FFFF",
            fontSize: 20,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          USD Exchange Graphics
        </Text>
      </View>

      <LineChart
        data={{
          labels: exchangeRates.map((item) => item.date),
          datasets: [{ data: exchangeRates.map((item) => item.rate) }],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 50,
  },
});
