import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductDetailScreen = () => {
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: 'ghsdhash' }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>55</Text>
      <Text style={styles.description}>gsasha aasyasas</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
