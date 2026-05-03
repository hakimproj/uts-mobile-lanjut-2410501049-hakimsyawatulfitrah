import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity,
  Image, ActivityIndicator, StyleSheet } from 'react-native';
import { searchMeals } from '../services/api';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') { setError('Kolom pencarian tidak boleh kosong'); return; }
    if (query.trim().length < 3) { setError('Minimal 3 karakter'); return; }
    setError('');
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchMeals(query.trim());
      setResults(data || []);
    } catch {
      setError('Gagal mencari. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.heading}>Cari Resep</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Contoh: chicken, beef, pasta..."
          value={query}
          onChangeText={text => { setQuery(text); setError(''); }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Cari</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorMsg}>{error}</Text> : null}

      {loading && <ActivityIndicator color="#E8593C" style={{ marginTop: 20 }} />}

      {!loading && searched && results.length === 0 && (
        <Text style={styles.noResult}>Resep tidak ditemukan untuk "{query}"</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('HomeTab', { screen: 'Detail', params: { mealId: item.idMeal } })}>
            <Image source={{ uri: item.strMealThumb + '/preview' }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.strMeal}</Text>
              <Text style={styles.sub}>{item.strCategory} · {item.strArea}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#1a1a1a' },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, backgroundColor: '#fafafa' },
  inputError: { borderColor: '#E8593C' },
  searchBtn: { backgroundColor: '#E8593C', paddingHorizontal: 18, borderRadius: 10, justifyContent: 'center' },
  searchBtnText: { color: 'white', fontWeight: '700' },
  errorMsg: { color: '#E8593C', fontSize: 12, marginBottom: 8 },
  noResult: { textAlign: 'center', marginTop: 30, color: '#888', fontSize: 14 },
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  sub: { fontSize: 12, color: '#888', marginTop: 3 },
});