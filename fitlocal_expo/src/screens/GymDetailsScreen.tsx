import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// We receive "route" so we can read the specific gym data passed from the Home Screen
export default function GymDetailsScreen({ route, navigation }: any) {
  const { gym } = route.params; // Extracting the gym we clicked on!

  return (
    <View style={styles.container}>
      {/* A placeholder for a future gym photo */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={60} color="#333" />
        <Text style={styles.imageText}>Gym Photo</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{gym.name}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={18} color="#FF5722" />
          <Text style={styles.subtitle}>{gym.address}</Text>
        </View>

        <Text style={styles.description}>
          Welcome to {gym.name}. This is a premium fitness facility located in the heart of {gym.address}. 
          More details about equipment, trainers, and pricing will go here!
        </Text>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>View Memberships</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  imagePlaceholder: {
    height: 250,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  imageText: { color: '#555', marginTop: 10, fontSize: 16 },
  infoContainer: { padding: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#ffffff', marginBottom: 10, letterSpacing: -0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#A0A0A0', fontWeight: '500', marginLeft: 6 },
  description: { fontSize: 16, color: '#cccccc', lineHeight: 24, marginBottom: 30 },
  joinButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});