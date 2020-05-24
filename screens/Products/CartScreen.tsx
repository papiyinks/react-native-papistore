import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigateProps } from '../../utils';
import { RootState } from '../../App';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = (props: NavigateProps) => {
  const CartProduct = useSelector((state: RootState) => state.cart.addedItems);
  const cartTotalAmount = useSelector((state: RootState) => state.cart.total);
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: ₦{Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
        </Text>
        {token ? (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={CartProduct.length === 0}
            onPress={() => {
              dispatch(ordersActions.addOrder(CartProduct, cartTotalAmount));
            }}
          />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={CartProduct.length === 0}
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
        )}
      </View>

      <View style={styles.noCartItem}>
        {CartProduct.length === 0 && (
          <Text style={styles.noItem}>
            No Item in the cart, Start Shopping!!
          </Text>
        )}
      </View>
      <FlatList
        data={CartProduct}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.name}
            price={itemData.item.price}
            deletable
            onAdd={() => {
              dispatch(cartActions.addQuantity(itemData.item._id));
            }}
            onRemove={() => {
              dispatch(cartActions.removeItem(itemData.item._id));
            }}
          >
            <Button
              color={Colors.primary}
              title="—"
              disabled={itemData.item.quantity === 1}
              onPress={() => {
                dispatch(cartActions.subtractQuantity(itemData.item._id));
              }}
            />
          </CartItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  noCartItem: {
    flex: 1,
    alignItems: 'center',
  },
  noItem: {
    fontFamily: 'open-sans-bold',
  },
});

export default CartScreen;
