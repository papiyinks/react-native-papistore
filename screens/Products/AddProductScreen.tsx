import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

type NavigateProps = {
  navigation: {
    navigate: (arg0: string) => void;
  };
};

const AddProductScreen = (props: NavigateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    description: '',
  });

  const { name, brand, price, image, description } = formData;

  const handleInputChange = (inputName: string, inputValue: string) =>
    setFormData({ ...formData, [inputName]: inputValue });
  const dispatch = useDispatch();

  const submitHandler = async () => {
    let action;
    action = productsActions.createProduct({
      name,
      brand,
      price,
      image,
      description,
    });

    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('All Products');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Name"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
          onChangeText={(value: string) => handleInputChange('name', value)}
        />
        <Input
          label="Brand"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
          onChangeText={(value: string) => handleInputChange('brand', value)}
        />
        <Input
          label="Price"
          keyboardType="decimal-pad"
          returnKeyType="next"
          required
          min={0.1}
          onChangeText={(value: string) => handleInputChange('price', value)}
        />
        <Input
          label="Image Url"
          keyboardType="default"
          returnKeyType="next"
          required
          onChangeText={(value: string) => handleInputChange('image', value)}
        />
        <Input
          label="Description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          required
          onChangeText={(value: string) =>
            handleInputChange('description', value)
          }
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.accent} />
          ) : (
            <Button
              title="Submit"
              color={Colors.accent}
              onPress={submitHandler}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default AddProductScreen;
