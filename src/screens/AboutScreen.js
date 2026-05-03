import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';


const NAMA = 'Hakim Syawatul Fitrah';
const NIM = '2410501049';
const KELAS = 'A'; 

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image
            source={require('../../assets/profile.jpg')}
            style={styles.avatar}
        />

      <Text style={styles.name}>{NAMA}</Text>
      <Text style={styles.nim}>NIM: {NIM}</Text>

      <View style={styles.card}>
        <Row label="Kelas" value={KELAS} />
        <Row label="Tema" value="Tema A (ResepKita)" />
        <Row label="Mata Kuliah" value="Pemrograman Mobile Lanjut" />
        <Row label="State Management" value="Context API + useReducer" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Credit API</Text>
        <Text style={styles.apiText}>TheMealDB.com</Text>
        <Text style={styles.apiUrl}>https://www.themealdb.com/api.php</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          UTS Pemrograman Mobile Lanjut
        </Text>
      </View>
    </ScrollView>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
    borderWidth: 3,
    borderColor: '#E8593C',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  nim: { fontSize: 15, color: '#888', marginBottom: 20 },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  rowLabel: { fontSize: 14, color: '#888' },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'right',
  },
  apiText: { fontSize: 16, fontWeight: '600', color: '#E8593C' },
  apiUrl: { fontSize: 12, color: '#aaa', marginTop: 4 },
  footer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#fef2ee',
    borderRadius: 10,
  },
  footerText: { color: '#E8593C', fontSize: 13, fontWeight: '500' },
});