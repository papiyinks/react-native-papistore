import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

type buttonProps = {
  props: string | boolean | JSX.Element;
};

const CustomHeaderButton = (props: buttonProps) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      title="Menu"
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
