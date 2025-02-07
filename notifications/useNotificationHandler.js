import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

export function useNotificationHandler() {
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
}
