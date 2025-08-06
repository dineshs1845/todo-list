import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../supabase';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error.message);
    else navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button mode="contained" onPress={handleSignUp}>Sign Up</Button>
      <Button onPress={() => navigation.navigate('Login')}>Back to Login</Button>
    </View>
  );
}
