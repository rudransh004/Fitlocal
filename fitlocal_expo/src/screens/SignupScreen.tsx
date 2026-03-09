import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation, onLogin }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Join Fitlocal</Text>
        <Text style={styles.subtitle}>Create an account to find your next session.</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        </View>

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
            placeholder="Create Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={onLogin}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.switchText}>Already have an account? <Text style={styles.switchTextBold}>Log In</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 50 },
  logoText: { fontSize: 36, fontWeight: '900', color: '#ffffff', letterSpacing: -1, marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#A0A0A0' },
  formContainer: { paddingHorizontal: 30 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1E1E1E', borderRadius: 12,
    marginBottom: 16, paddingHorizontal: 15, height: 55,
    borderWidth: 1, borderColor: '#2A2A2A',
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#ffffff', fontSize: 16, outlineStyle: 'none' as any },
  signupButton: {
    backgroundColor: '#ffffff', borderRadius: 12, height: 55,
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  signupButtonText: { color: '#121212', fontSize: 18, fontWeight: 'bold' },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#888888', fontSize: 15 },
  switchTextBold: { color: '#FF5722', fontWeight: 'bold' }
});