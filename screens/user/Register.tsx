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

const RegisterScreen = (props: NavigateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    password: '',
  });

  const { firstname, lastname, email, telephone, password } = formData;

  const handleInputChange = (inputName: string, inputValue: string) =>
    setFormData({ ...formData, [inputName]: inputValue });

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    action = authActions.signup({
      firstname,
      lastname,
      email,
      telephone,
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
          label="First Name"
          keyboardType="default"
          required
          onChangeText={(value: string) =>
            handleInputChange('firstname', value)
          }
          defaultValue=""
        />
        <Input
          label="Last Name"
          keyboardType="default"
          required
          onChangeText={(value: string) => handleInputChange('lastname', value)}
          defaultValue=""
        />
        <Input
          label="E-Mail"
          keyboardType="email-address"
          required
          email
          onChangeText={(value: string) => handleInputChange('email', value)}
          defaultValue=""
        />
        <Input
          label="Phone Number"
          keyboardType="numeric"
          required
          onChangeText={(value: string) =>
            handleInputChange('telephone', value)
          }
          defaultValue=""
        />
        <Input
          label="Password"
          keyboardType="default"
          secureTextEntry
          required
          onChangeText={(value: string) => handleInputChange('password', value)}
          defaultValue=""
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.accent} />
          ) : (
            <Button
              title="Sign Up"
              color={Colors.accent}
              onPress={authHandler}
            />
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

export default RegisterScreen;
