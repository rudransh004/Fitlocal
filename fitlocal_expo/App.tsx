import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import all our screens
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import GymDetailsScreen from './src/screens/GymDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. The Gatekeeper: Our Auth Stack for logged-out users
function AuthStack({ onLogin }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {props => <SignupScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// 2. The Main Feed Stack (from before)
function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fitlocal' }} />
      <Stack.Screen name="GymDetails" component={GymDetailsScreen} options={({ route }: any) => ({ title: route.params.gym.name })} />
    </Stack.Navigator>
  );
}

// 3. The Master App Component
export default function App() {
  // This state controls what the user sees! Starts as false (logged out).
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <NavigationContainer>
        
        {/* If NOT authenticated, show the Login Screens. If YES, show the Main App Tabs! */}
        {!isAuthenticated ? (
          <AuthStack onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: any;
                if (route.name === 'FeedStack') {
                  iconName = focused ? 'barbell' : 'barbell-outline';
                } else if (route.name === 'Map') {
                  iconName = focused ? 'map' : 'map-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarStyle: { backgroundColor: '#161616', borderTopWidth: 0, paddingBottom: 8, paddingTop: 8, height: 65 },
              tabBarActiveTintColor: '#FF5722',
              tabBarInactiveTintColor: '#666666',
              headerShown: false,
            })}
          >
            <Tab.Screen name="FeedStack" component={FeedStackNavigator} options={{ title: 'Fitlocal' }} />
            <Tab.Screen 
              name="Map" 
              component={MapScreen} 
              options={{ 
                title: 'Gym Locator', headerShown: true, 
                headerStyle: { backgroundColor: '#121212', shadowColor: 'transparent', elevation: 0 },
                headerTintColor: '#ffffff', headerTitleStyle: { fontWeight: '900', fontSize: 26, letterSpacing: -1 }
              }} 
            />
            {/* Pass an onLogout function to the ProfileScreen so users can actually log out! */}
            <Tab.Screen 
              name="Profile" 
              options={{ 
                title: 'My Profile', headerShown: true,
                headerStyle: { backgroundColor: '#121212', shadowColor: 'transparent', elevation: 0 },
                headerTintColor: '#ffffff', headerTitleStyle: { fontWeight: '900', fontSize: 26, letterSpacing: -1 }
              }} 
            >
              {props => <ProfileScreen {...props} onLogout={() => setIsAuthenticated(false)} />}
            </Tab.Screen>
          </Tab.Navigator>
        )}

      </NavigationContainer>
    </SafeAreaProvider>
  );
}