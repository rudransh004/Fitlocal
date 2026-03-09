import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ onLogout }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* User Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={50} color="#555" />
        </View>
        <Text style={styles.name}>Fitness Enthusiast</Text>
        <Text style={styles.email}>user@fitlocal.com</Text>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Account</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="card-outline" size={22} color="#ffffff" style={styles.menuIcon} />
            <Text style={styles.menuText}>Active Memberships</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="bookmark-outline" size={22} color="#ffffff" style={styles.menuIcon} />
            <Text style={styles.menuText}>Saved Gyms</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="settings-outline" size={22} color="#ffffff" style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50, 
    backgroundColor: '#1E1E1E', 
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 15, borderWidth: 2, borderColor: '#2A2A2A'
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 5 },
  email: { fontSize: 16, color: '#888888', marginBottom: 20 },
  editButton: {
    paddingVertical: 8, paddingHorizontal: 20,
    backgroundColor: '#2A2A2A', borderRadius: 20,
  },
  editButtonText: { color: '#ffffff', fontWeight: '600' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#888888', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 10,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 15 },
  menuText: { fontSize: 16, color: '#ffffff', fontWeight: '500' },
  logoutButton: {
    backgroundColor: '#ff3b30', // A standard destructive red color
    padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20,
  },
  logoutText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});