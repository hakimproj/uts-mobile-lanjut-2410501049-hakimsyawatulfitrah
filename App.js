import React from 'react';
import { FavoritProvider } from './src/context/FavoritContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <FavoritProvider>
      <AppNavigator />
    </FavoritProvider>
  );
}