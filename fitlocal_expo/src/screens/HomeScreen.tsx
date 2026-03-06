import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // <-- Adding icons to our cards

interface Gym {
  id: number;
  name: string;
  address: string;
  location: any;
}

const API_URL = 'http://localhost:5000/api/gyms';

export default function HomeScreen() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setGyms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gyms:", err);
        setLoading(false);
      });
  }, []);

  const renderGym = ({ item }: { item: Gym }) => (
    // TouchableOpacity makes the card "clickable" and gives a subtle dimming effect
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.name}</Text>
        <Ionicons name="chevron-forward" size={20} color="#555" />
      </View>
      
      <View style={styles.locationRow}>
        <Ionicons name="location-sharp" size={16} color="#FF5722" style={styles.locationIcon} />
        <Text style={styles.subtitle}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF5722" style={styles.loader} />
      ) : (
        <FlatList
          data={gyms}
          keyExtractor={item => item.id.toString()}
          renderItem={renderGym}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  card: { 
    backgroundColor: '#1E1E1E', 
    padding: 22, 
    borderRadius: 20, // More rounded, modern corners
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#2A2A2A',
    // Adding shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#ffffff', 
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 6,
  },
  subtitle: { 
    fontSize: 15, 
    color: '#A0A0A0',
    fontWeight: '500',
  }
});