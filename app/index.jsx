// In App.js in a new project

import * as React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConverterScreen from "../screens/ConverterScreen";
import { Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import HistoryScreen from "../screens/HistoryScreen";
import { store } from "../store";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ExchangeDetailScren from "../screens/ExchangeDetailScren";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// RootStack'i şimdilik kullanmıyoruz çünkü TAB yapısı mevcut ve onun üzerinden ilerleyeceğiz.
function RootStack() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1E1E1E" },
        headerTintColor: "#0ECB81",
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={ScreenTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ title: "Sign In" }}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Sign Up" }}
      />

      <Stack.Screen
        name="ExchangeDetail"
        component={ExchangeDetailScren}
        options={({ route }) => ({
          headerTitle: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
}

// ScreenTabs fonksiyonundan Signin ve Signup Tab.Screen'leri silin
function ScreenTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#171515", borderTopWidth: 0 },
        tabBarActiveTintColor: "#0ECB81",
        tabBarInactiveTintColor: "#B0B3B8",
        headerStyle: { backgroundColor: "#1E1E1E" },
        headerTintColor: "#0ECB81",
      }}
    >
      {/* Sadece kalmasını istediğiniz tab'ları bırakın */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Converter"
        component={ConverterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/change.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
          title: "History",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NavigationIndependentTree>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    color: "#ffffff",
  },
  addButton: {
    marginRight: 15,
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
