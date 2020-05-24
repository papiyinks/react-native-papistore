import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../App';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

type editProp = {
  navigation: { navigate: (arg0: string, arg1: { id: string }) => void };
};

const EditProductScreen = (props: editProp) => {
  const selectedProduct = useSelector(
    (state: RootState) => state.products.showProduct
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: selectedProduct.name,
    brand: selectedProduct.brand,
    price: selectedProduct.price.toString(),
    image: selectedProduct.image,
    description: selectedProduct.description,
  });

  const { name, brand, price, image, description } = formData;

  const handleInputChange = (inputName: string, inputValue: string) =>
    setFormData({ ...formData, [inputName]: inputValue });
  const dispatch = useDispatch();

  const submitHandler = async (id: string) => {
    let action;
    action = productsActions.updateProduct(id, {
      name,
      brand,
      price,
      image,
      description,
    });

    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Product Details', { id });
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
          value={name}
          onChangeText={(value: string) => handleInputChange('name', value)}
        />
        <Input
          label="Brand"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
          value={brand}
          onChangeText={(value: string) => handleInputChange('brand', value)}
        />
        <Input
          label="Price"
          keyboardType="decimal-pad"
          returnKeyType="next"
          required
          value={price}
          onChangeText={(value: string) => handleInputChange('price', value)}
        />
        <Input
          label="Image Url"
          keyboardType="default"
          returnKeyType="next"
          required
          value={image}
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
          value={description}
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
              onPress={() => submitHandler(selectedProduct._id)}
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

export default EditProductScreen;
