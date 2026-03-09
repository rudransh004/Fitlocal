import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Gym {
  id: number;
  name: string;
  address: string;
  location: any;
}

const API_URL = 'http://localhost:5000/api/gyms';

export default function HomeScreen({ navigation }: any) {
  const [gyms, setGyms] = useState<Gym[]>([]);
  // We need a second array to hold the filtered results while keeping the original data safe!
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State to track what the user is typing
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setGyms(data);
        setFilteredGyms(data); // On first load, the filtered list is just all the gyms
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gyms:", err);
        setLoading(false);
      });
  }, []);

  // The engine that runs every time a user types a letter
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    // Convert everything to lowercase so the search isn't case-sensitive
    const formattedQuery = text.toLowerCase();
    
    // Filter the master list of gyms based on name OR address
    const filteredData = gyms.filter(gym => 
      gym.name.toLowerCase().includes(formattedQuery) || 
      gym.address.toLowerCase().includes(formattedQuery)
    );
    
    setFilteredGyms(filteredData);
  };

  const renderGym = ({ item }: { item: Gym }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('GymDetails', { gym: item })}
    >
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
      
      {/* --- NEW SEARCH BAR UI --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search gyms or locations..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {/* Show a clear button (X) only if the user has typed something */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF5722" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredGyms} // <-- Now we feed the FlatList the filtered array!
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
  
  // Styling the new Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    outlineStyle: 'none' as any, // Prevents the ugly blue border on web browsers
  },
  
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 40 },
  card: { 
    backgroundColor: '#1E1E1E', 
    padding: 22, 
    borderRadius: 20, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { marginRight: 6 },
  subtitle: { fontSize: 15, color: '#A0A0A0', fontWeight: '500' }
});