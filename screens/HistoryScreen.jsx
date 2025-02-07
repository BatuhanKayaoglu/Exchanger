import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Notifications from 'expo-notifications';
import { useNavigation } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function HistoryScreen() {

  const navigation = useNavigation();

useEffect(() => {
    const receivedListener = Notifications.addNotificationReceivedListener(notification => {
      console.log("Bildirim Alındı: ", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Bildirim Cevaplandı: ", response);
      navigation.navigate("MainTabs");
    });

    return () => {
      Notifications.removeNotificationSubscription(receivedListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function scheduleNotificationHandler() {
    console.log("Notification Scheduled");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "USD Exchange Rate",
        body: "USD/TRY: 8.50",
        data: { data: "goes here" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }


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

      <Button title="Schedule Notification" onPress={scheduleNotificationHandler}/>

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
