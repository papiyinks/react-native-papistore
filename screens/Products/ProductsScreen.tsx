import React from 'react';
import { FlatList, Button } from 'react-native';

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';

type NavProps = {
  navigation: { navigate: (arg0: string) => void };
};

const ProductsScreen = (props: NavProps) => {
  // const products = null;
  return (
    // <FlatList
    //   data={products}
    //   keyExtractor={(item) => item.id}
    //   renderItem={(itemData) => (
    <ProductItem
      // image={itemData.item.imageUrl}
      // title={itemData.item.title}
      // price={itemData.item.price}
      image="xhjhsds"
      title="title"
      price={65}
      onSelect={() => {}}
    >
      <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => {
          props.navigation.navigate('Product Details');
        }}
      />
      <Button color={Colors.accent} title="To Cart" onPress={() => {}} />
    </ProductItem>
    //   )}
    // />
  );
};

export default ProductsScreen;
