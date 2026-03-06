import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // <-- Bringing in professional icons

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // This logic swaps the icons depending on which tab you are viewing
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any;

              if (route.name === 'Feed') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'map' : 'map-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { 
              backgroundColor: '#161616', // Slightly lighter than pure black for depth
              borderTopWidth: 0, // Removes the harsh border line
              paddingBottom: 8,
              paddingTop: 8,
              height: 65,
              elevation: 10, // Adds a subtle shadow on Android
            },
            tabBarActiveTintColor: '#FF5722', // A high-energy fitness orange!
            tabBarInactiveTintColor: '#666666',
            headerStyle: { 
              backgroundColor: '#121212',
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: '900',
              fontSize: 26,
              letterSpacing: -1,
            }
          })}
        >
          <Tab.Screen 
            name="Feed" 
            component={HomeScreen} 
            options={{ title: 'Fitlocal' }} 
          />
          <Tab.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ title: 'Gym Locator' }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}