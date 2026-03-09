import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen() {
  // Safe, web-friendly placeholder. We will add the real map back when we move to your phone!
  return (
    <View style={styles.webContainer}>
      <Text style={styles.webTitle}>Gym Locator</Text>
      <Text style={styles.webSubtitle}>
        Interactive GPS maps will activate when testing on a physical Android or iOS device.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  webSubtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
  }
});