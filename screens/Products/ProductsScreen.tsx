import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../App';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

type NavProps = {
  navigation: { navigate: (arg0: string) => void };
};

export interface IntProducts {
  name: string;
  brand: string;
  owner: string;
  price: number;
  description: string;
  image: string;
  _id: string;
}

const ProductsScreen = (props: NavProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      console.log(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const showProductHandler = async (id: string) => {
    let action;
    action = productsActions.fetchProductById(id);

    try {
      await dispatch(action);
      props.navigation.navigate('Product Details');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      refreshing={isRefreshing}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.image}
          name={itemData.item.name}
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => showProductHandler(itemData.item._id)}
          />
          <Button
            color={Colors.accent}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductsScreen;
