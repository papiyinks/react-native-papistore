import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';
import AddProductScreen from '../screens/Products/AddProductScreen';
import EditProductScreen from '../screens/Products/EditProductScreen';
import RegisterSceen from '../screens/user/Register';
import LoginScreen from '../screens/user/Login';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

type drawerProps = {
  navigation: { toggleDrawer: () => void; navigate: (arg0: string) => void };
};

const CustomHeaderButton = (props: drawerProps) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  );
};

const HomeStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => <CustomHeaderButton {...props} />,
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          },
          headerTitleStyle: {
            fontFamily: 'open-sans-bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ProductsStack = (props: drawerProps) => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsScreen"
      screenOptions={{
        headerLeft: () => <CustomHeaderButton {...props} />,
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Stack.Screen
        name="All Products"
        component={ProductsScreen}
        options={{
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === 'android' ? 'md-create' : 'ios-create'
                }
                onPress={() => {
                  props.navigation.navigate('Add Product');
                }}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen name="Product Details" component={ProductDetailScreen} />
      <Stack.Screen
        name="Add Product"
        component={AddProductScreen}
        options={{
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName={
                  Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                }
                onPress={() => {}}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={{
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName={
                  Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                }
                onPress={() => {}}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const RegisterStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterSceen} />
    </Stack.Navigator>
  );
};

const LoginStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accent,
        labelStyle: { fontFamily: 'open-sans-bold' },
        activeBackgroundColor: '#f6f8fa',
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Products" component={ProductsStack} />
      <Drawer.Screen name="Register" component={RegisterStack} />
      <Drawer.Screen name="Login" component={LoginStack} />
    </Drawer.Navigator>
  );
};
