import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MyDrawer } from './Navigators';

const NavContainer = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default NavContainer;
