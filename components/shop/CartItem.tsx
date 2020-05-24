import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type cartItemProp = {
  quantity: {} | null | undefined;
  title: React.ReactNode;
  price: number;
  deletable: any;
  onAdd:
    | ((event: import('react-native').GestureResponderEvent) => void)
    | undefined;
  onRemove:
    | ((event: import('react-native').GestureResponderEvent) => void)
    | undefined;
  children: React.ReactNode;
};

const CartItem = (props: any) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          ₦{(props.quantity * props.price).toFixed(2)}
        </Text>
        {props.deletable && (
          <>
            <TouchableOpacity onPress={props.onAdd} style={styles.iconButton}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                size={23}
                color="#5FCA53"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onRemove}
              style={styles.iconButton}
            >
              <Ionicons
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={23}
                color="red"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.action}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    marginLeft: -30,
  },
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 1,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 20,
  },
});

export default CartItem;
