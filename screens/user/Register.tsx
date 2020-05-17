import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

type RegProps = {
  navigation: { navigate: (arg0: string) => void };
};

const RegisterScreen = (props: RegProps) => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephone, SetPhonenumber] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleFirstnamechange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFirstname(event.target.value);
  const handleLastnamechange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLastname(event.target.value);
  const handleEmailchange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePhonechange = (event: React.ChangeEvent<HTMLInputElement>) =>
    SetPhonenumber(event.target.valueAsNumber);
  const handlePasswordchange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const authHandler = async () => {
    let action;
    const data = {
      firstname,
      lastname,
      email,
      telephone,
      password,
    };
    action = authActions.signup(data);

    try {
      await dispatch(action);
      props.navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            // id="firstname"
            value={firstname}
            label="First Name"
            keyboardType="default"
            required
            onChange={handleFirstnamechange}
          />
          <Input
            // id="lastname"
            value={lastname}
            label="Last Name"
            keyboardType="default"
            onChange={handleLastnamechange}
            required
            email
          />
          <Input
            // id="email"
            value={email}
            label="E-Mail"
            keyboardType="email-address"
            required
            onChange={handleEmailchange}
            email
          />
          <Input
            // id="telephone"
            valueAsNumber={telephone}
            label="Phone Number"
            keyboardType="numeric"
            required
            onChange={handlePhonechange}
          />
          <Input
            // id="password"
            value={password}
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            onChange={handlePasswordchange}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              color={Colors.accent}
              onPress={authHandler}
            />
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

export default RegisterScreen;
