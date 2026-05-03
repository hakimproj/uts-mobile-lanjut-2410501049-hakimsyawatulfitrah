import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, Alert
} from 'react-native';
import { useFavorit } from '../context/FavoritContext';

export default function FavoritesScreen({ navigation }) {
  const { state, dispatch } = useFavorit();

  const handleDelete = (mealId, mealName) => {
    Alert.alert('Hapus Favorit', `Hapus "${mealName}" dari favorit?`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => dispatch({ type: 'REMOVE_FAVORITE', payload: mealId }),
      },
    ]);
  };

  if (state.favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🍽️</Text>
        <Text style={styles.emptyText}>Belum ada favorit</Text>
        <Text style={styles.emptyHint}>
          Tambahkan resep dari halaman Detail
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.count}>
        {state.favorites.length} resep tersimpan
      </Text>
      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('HomeTab', {
                screen: 'Detail',
                params: { mealId: item.idMeal, mealName: item.strMeal },
              })
            }
          >
            <Image
              source={{ uri: item.strMealThumb + '/preview' }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.strMeal}</Text>
              <Text style={styles.hint}>Ketuk untuk detail</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.idMeal, item.strMeal)}
            >
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: { fontSize: 60, marginBottom: 12 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#333' },
  emptyHint: { fontSize: 13, color: '#888', marginTop: 6 },
  count: {
    padding: 12,
    fontSize: 13,
    color: '#888',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  hint: { fontSize: 12, color: '#888', marginTop: 2 },
  deleteBtn: {
    backgroundColor: '#fef2ee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: { color: '#E8593C', fontWeight: '600', fontSize: 13 },
});