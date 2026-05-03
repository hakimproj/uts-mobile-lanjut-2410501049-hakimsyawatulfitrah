import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image,
  ActivityIndicator, StyleSheet, RefreshControl, Alert } from 'react-native';
import { fetchMealsByCategory } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadMeals = async () => {
    try {
      setError(null);
      const data = await fetchMealsByCategory('Chicken');
      setMeals(data);
    } catch (err) {
      setError('Gagal memuat data. Periksa koneksi internet kamu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadMeals(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadMeals();
  }, []);

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#E8593C" />
      <Text style={styles.loadingText}>Memuat resep...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryBtn} onPress={loadMeals}>
        <Text style={styles.retryText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E8593C']} />}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}
          onPress={() => navigation.navigate('Detail', { mealId: item.idMeal, mealName: item.strMeal })}>
          <Image source={{ uri: item.strMealThumb + '/preview' }} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.mealName}>{item.strMeal}</Text>
            <Text style={styles.mealSub}>Ketuk untuk detail →</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 10, color: '#666', fontSize: 14 },
  errorText: { color: '#E8593C', fontSize: 14, textAlign: 'center', marginBottom: 12 },
  retryBtn: { backgroundColor: '#E8593C', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  retryText: { color: 'white', fontWeight: '600' },
  card: { flexDirection: 'row', margin: 10, backgroundColor: 'white', borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, overflow: 'hidden' },
  image: { width: 90, height: 90 },
  cardBody: { flex: 1, padding: 12, justifyContent: 'center' },
  mealName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 },
  mealSub: { fontSize: 12, color: '#888' },
});