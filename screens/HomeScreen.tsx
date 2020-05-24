import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../App';
import * as productsActions from '../store/actions/products';

const Slider = () => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fecthData = async () => {
      try {
        await dispatch(productsActions.fetchProducts());
      } catch (err) {
        console.log(err);
      }
    };
    fecthData();
  }, []);

  const images = products.map((product: { image: string }) => {
    return product.image;
  });

  return <SliderBox autoplay={true} circleLoop={true} images={images} />;
};

const HomeScreen = () => {
  return (
    <>
      <View>
        <Slider />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    marginTop: 30,
  },
});

export default HomeScreen;
