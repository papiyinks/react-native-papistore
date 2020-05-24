import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../App';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

const ProductDetailScreen = (props: any) => {
  const selectedProduct = useSelector(
    (state: RootState) => state.products.showProduct
  );
  const userId = useSelector((state: RootState) => state.auth.userId);

  const dispatch = useDispatch();

  const editProductHandler = (id: string) => {
    props.navigation.navigate('Edit Product', { id });
  };

  const deleteProductHandler = async (id: string) => {
    let action;
    action = productsActions.deleteProduct(id);

    try {
      await dispatch(action);
      props.navigation.navigate('All Products');
    } catch (err) {
      console.log(err);
    }
  };

  const addProductToCartHandler = async (product: object) => {
    let action;
    action = cartActions.addToCart(product);

    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: selectedProduct.image }} />
        <View style={styles.nameWrapper}>
          <Text style={styles.nameBrand}>{selectedProduct.name}</Text>
          <Text style={styles.nameBrand}>{selectedProduct.brand}</Text>
        </View>
        {userId !== selectedProduct.owner ? (
          <View style={styles.actions}>
            <Button
              color={Colors.primary}
              title="Add to Cart"
              onPress={() => {
                addProductToCartHandler(selectedProduct);
              }}
            />
          </View>
        ) : (
          <View style={styles.nameWrapper}>
            <Button
              color="#5FCA53"
              title="Edit Product"
              onPress={() => {
                editProductHandler(selectedProduct._id);
              }}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                addProductToCartHandler(selectedProduct);
              }}
            />
            <Button
              color={Colors.accent}
              title="Delete"
              onPress={() => {
                deleteProductHandler(selectedProduct._id);
              }}
            />
          </View>
        )}
        <Text style={styles.price}>₦{selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginHorizontal: 20,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  nameBrand: {
    fontFamily: 'open-sans-bold',
  },
});

export default ProductDetailScreen;
