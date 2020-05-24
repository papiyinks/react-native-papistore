import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigateProps } from '../../utils';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const LoginScreen = (props: NavigateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleInputChange = (inputName: string, inputValue: string) =>
    setFormData({ ...formData, [inputName]: inputValue });

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    action = authActions.login({
      email,
      password,
    });

    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="E-Mail"
          keyboardType="email-address"
          required
          email
          returnKeyType="next"
          errorText="Please enter a valid email address."
          onChangeText={(value: string) => handleInputChange('email', value)}
          defaultValue=""
        />
        <Input
          label="Password"
          keyboardType="default"
          secureTextEntry
          required
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(value: string) => handleInputChange('password', value)}
          defaultValue=""
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.accent} />
          ) : (
            <Button title="Login" color={Colors.accent} onPress={authHandler} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
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
