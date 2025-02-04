// In App.js in a new project

import * as React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConverterScreen from '../screens/ConverterScreen';
import { Alert, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from 'expo-router';
import HistoryScreen from '../screens/HistoryScreen';
import { store } from '../store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// RootStack'i şimdilik kullanmıyoruz çünkü TAB yapısı mevcut ve onun üzerinden ilerleyeceğiz.
function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}


function ScreenTabs() {

    const navigation = useNavigation();

    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
              backgroundColor: '#171515', 
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: '#0ECB81', 
            tabBarInactiveTintColor: '#B0B3B8', 
            headerStyle: {
              backgroundColor: '#1E1E1E', 
            },
            headerTintColor: '#0ECB81', 
          }}
        >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            title: "Home",
          }}
        />

        <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
            title: "Profile",
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

        <Tab.Screen
        name="Converter"
        component={ConverterScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
                <Image source={require('../assets/images/change.png')} style={{ width: 20, height: 20 }} />
            ),
            title: "Converter",
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
                    <ScreenTabs />
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