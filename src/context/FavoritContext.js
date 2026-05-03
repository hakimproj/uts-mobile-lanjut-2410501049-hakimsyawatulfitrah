import React, { createContext, useReducer, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritContext = createContext();

const favoritReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'ADD_FAVORITE':
      const newFavs = [...state.favorites, action.payload];
      AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
      return { ...state, favorites: newFavs };
    case 'REMOVE_FAVORITE':
      const filtered = state.favorites.filter(m => m.idMeal !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(filtered));
      return { ...state, favorites: filtered };
    default:
      return state;
  }
};

export const FavoritProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritReducer, { favorites: [] });

  React.useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(stored) });
    };
    loadFavorites();
  }, []);

  return (
    <FavoritContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritContext.Provider>
  );
};

export const useFavorit = () => useContext(FavoritContext);