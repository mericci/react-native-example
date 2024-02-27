import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../../assets/styles/Global';

export default function Header({ navigation }) {

  return (
    <TouchableOpacity style={globalStyles.header}>
      <Image style={globalStyles.headerLogo} source ={require('../../../assets/images/logo.png')}/>
    </TouchableOpacity>
  );
}