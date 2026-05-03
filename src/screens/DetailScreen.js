import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,
  ActivityIndicator, StyleSheet, Alert, Linking } from 'react-native';
import { fetchMealDetail } from '../services/api';
import { useFavorit } from '../context/FavoritContext';

export default function DetailScreen({ route }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useFavorit();

  useEffect(() => {
    fetchMealDetail(mealId)
      .then(data => setMeal(data))
      .catch(() => Alert.alert('Error', 'Gagal memuat detail resep'))
      .finally(() => setLoading(false));
  }, [mealId]);

  const isFavorite = state.favorites.some(f => f.idMeal === mealId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: mealId });
      Alert.alert('Dihapus', 'Resep dihapus dari favorit');
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb } });
      Alert.alert('Ditambahkan!', 'Resep berhasil disimpan ke favorit ❤️');
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#E8593C" />;
  if (!meal) return <View style={styles.center}><Text>Data tidak ditemukan</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{meal.strMeal}</Text>

        {/* 5 field wajib */}
        <View style={styles.field}><Text style={styles.label}>Kategori</Text><Text style={styles.value}>{meal.strCategory}</Text></View>
        <View style={styles.field}><Text style={styles.label}>Area / Negara</Text><Text style={styles.value}>{meal.strArea}</Text></View>
        <View style={styles.field}><Text style={styles.label}>Tags</Text><Text style={styles.value}>{meal.strTags || 'Tidak ada tag'}</Text></View>
        <View style={styles.field}><Text style={styles.label}>Sumber</Text>
          <TouchableOpacity onPress={() => meal.strSource && Linking.openURL(meal.strSource)}>
            <Text style={[styles.value, { color: '#E8593C' }]}>Buka Sumber</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.field}><Text style={styles.label}>Video YouTube</Text>
          <TouchableOpacity onPress={() => meal.strYoutube && Linking.openURL(meal.strYoutube)}>
            <Text style={[styles.value, { color: '#E8593C' }]}>Tonton ▶</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Cara Memasak</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>

        <TouchableOpacity style={[styles.favBtn, isFavorite && styles.favBtnActive]} onPress={toggleFavorite}>
          <Text style={styles.favBtnText}>{isFavorite ? '💔 Hapus dari Favorit' : '❤️ Tambah ke Favorit'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 240 },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 },
  field: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  label: { fontSize: 14, color: '#888', flex: 1 },
  value: { fontSize: 14, fontWeight: '500', color: '#1a1a1a', flex: 1, textAlign: 'right' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8, color: '#1a1a1a' },
  instructions: { fontSize: 14, color: '#444', lineHeight: 22 },
  favBtn: { backgroundColor: '#E8593C', padding: 14, borderRadius: 12,
    alignItems: 'center', marginTop: 24, marginBottom: 32 },
  favBtnActive: { backgroundColor: '#aaa' },
  favBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});