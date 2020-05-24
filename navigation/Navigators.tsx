import React from 'react';
import { Platform, Button, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../App';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';
import AddProductScreen from '../screens/Products/AddProductScreen';
import EditProductScreen from '../screens/Products/EditProductScreen';
import CartScreen from '../screens/Products/CartScreen';
import OrdersScreen from '../screens/Products/OrderScreen';
import RegisterSceen from '../screens/user/Register';
import LoginScreen from '../screens/user/Login';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        name="PapiStore"
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
      <Stack.Screen name="Product Details" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

const ProductsStack = (props: drawerProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);

  return (
    <Stack.Navigator
      initialRouteName="All Products"
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
              {isLoggedIn ? (
                <Item
                  title="Add"
                  iconName={
                    Platform.OS === 'android' ? 'md-create' : 'ios-create'
                  }
                  onPress={() => {
                    props.navigation.navigate('Add Product');
                  }}
                />
              ) : (
                []
              )}
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  props.navigation.navigate('Cart');
                }}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen name="Product Details" component={ProductDetailScreen} />
      <Stack.Screen name="Add Product" component={AddProductScreen} />
      <Stack.Screen name="Edit Product" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const RegisterStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterSceen}
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

const LoginStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
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

const CartStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
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

const OrderStack = (props: drawerProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
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

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Products') {
            iconName = 'ios-list-box';
          } else if (route.name === 'Cart') {
            iconName = 'ios-cart';
          }

          return <Ionicons name={iconName} size={30} color="black" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.accent,
        activeBackgroundColor: '#DCDCDC',
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Cart" component={CartStack} />
    </Tab.Navigator>
  );
};

export const MyDrawer = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accent,
        labelStyle: { fontFamily: 'open-sans-bold' },
        activeBackgroundColor: '#f6f8fa',
      }}
      drawerContent={(props: drawerProps) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {isLoggedIn ? (
              <DrawerItem
                label="Logout"
                labelStyle={{ fontFamily: 'open-sans-bold' }}
                onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.navigate('Home');
                }}
              />
            ) : (
              []
            )}
          </DrawerContentScrollView>
        );
      }}
    >
      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Home" component={BottomTabs} />
          <Drawer.Screen name="Products" component={ProductsStack} />
          <Drawer.Screen name="Orders" component={OrderStack} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Home" component={BottomTabs} />
          <Drawer.Screen name="Products" component={ProductsStack} />
          <Drawer.Screen name="Orders" component={OrderStack} />
          <Drawer.Screen name="Register" component={RegisterStack} />
          <Drawer.Screen name="Login" component={LoginStack} />
        </>
      )}
    </Drawer.Navigator>
  );
};
