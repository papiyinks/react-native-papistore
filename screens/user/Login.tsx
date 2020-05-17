import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const LoginScreen = (props: any) => {
  return (
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" color={Colors.accent} onPress={() => {}} />
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default LoginScreen;
