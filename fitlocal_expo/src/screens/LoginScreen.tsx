import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation, onLogin }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Fitlocal</Text>
        <Text style={styles.subtitle}>Welcome back. Ready to train?</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* For now, this just bypasses the login and lets us into the app! */}
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.switchText}>Don't have an account? <Text style={styles.switchTextBold}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 50 },
  logoText: { fontSize: 42, fontWeight: '900', color: '#FF5722', letterSpacing: -1.5, marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#A0A0A0' },
  formContainer: { paddingHorizontal: 30 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1E1E1E', borderRadius: 12,
    marginBottom: 16, paddingHorizontal: 15, height: 55,
    borderWidth: 1, borderColor: '#2A2A2A',
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#ffffff', fontSize: 16, outlineStyle: 'none' as any }, // 'as any' prevents the web error!
  loginButton: {
    backgroundColor: '#FF5722', borderRadius: 12, height: 55,
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
    shadowColor: '#FF5722', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 5, elevation: 5,
  },
  loginButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#888888', fontSize: 15 },
  switchTextBold: { color: '#ffffff', fontWeight: 'bold' }
});