import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // <-- New import!
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import GymDetailsScreen from './src/screens/GymDetailsScreen'; // <-- Importing our new screen

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // <-- Creating the Stack

// This mini-navigator groups the Feed and the Details together
function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false, // Removes the border line
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Fitlocal' }} 
      />
      <Stack.Screen 
        name="GymDetails" 
        component={GymDetailsScreen} 
        options={({ route }: any) => ({ title: route.params.gym.name })} // Dynamically sets header to the Gym's name!
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any;
              if (route.name === 'FeedStack') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'map' : 'map-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { 
              backgroundColor: '#161616', 
              borderTopWidth: 0, 
              paddingBottom: 8, paddingTop: 8, height: 65 
            },
            tabBarActiveTintColor: '#FF5722',
            tabBarInactiveTintColor: '#666666',
            headerShown: false, // Hiding the Tab header because our Stack has its own header now!
          })}
        >
          {/* We replace the plain HomeScreen with our new FeedStackNavigator */}
          <Tab.Screen 
            name="FeedStack" 
            component={FeedStackNavigator} 
            options={{ title: 'Fitlocal' }} 
          />
          <Tab.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ 
              title: 'Gym Locator',
              headerShown: true, // Keep the header for the map
              headerStyle: { backgroundColor: '#121212', shadowColor: 'transparent', elevation: 0 },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: '900', fontSize: 26, letterSpacing: -1 }
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}