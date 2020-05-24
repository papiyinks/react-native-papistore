import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../App';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No orders found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          items={itemData.item.cartItems}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
