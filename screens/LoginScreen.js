import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button, Text, Card, Title } from 'react-native-paper';
import { supabase } from '../supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigation.navigate('Todo');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
        <Title style={styles.title}>Welcome Back!</Title>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {error && <Text style={styles.error}>{error}</Text>}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={{ paddingVertical: 6 }}
          >
            Login
          </Button>

          <Button
            onPress={() => navigation.navigate('SignUp')}
            labelStyle={styles.linkLabel}
            style={styles.linkButton}
          >
            Don't have an account? Sign Up
          </Button>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F5FF',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 16,
    elevation: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 10,
  },
  linkLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
