import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const EditProductScreen = () => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="name"
          label="Name"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
        />
        <Input
          id="brand"
          label="Brand"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          required
        />
        <Input
          id="price"
          label="Price"
          keyboardType="decimal-pad"
          returnKeyType="next"
          required
          min={0.1}
        />
        <Input
          id="imageUrl"
          label="Image Url"
          keyboardType="default"
          returnKeyType="next"
          required
        />
        <Input
          id="description"
          label="Description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          required
        />
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
});

export default EditProductScreen;
