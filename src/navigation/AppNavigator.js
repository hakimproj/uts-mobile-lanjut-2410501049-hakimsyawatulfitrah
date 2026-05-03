import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: '🍳 ResepKita' }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: 'Detail Resep' }}
    />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#E8593C',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 18 }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'Favorit',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 18 }}>❤️</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Cari',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 18 }}>🔍</Text>
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'About',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 18 }}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}