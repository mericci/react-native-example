import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';

export default function Header({ navigation }) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  const onPressHandler = () => {
    Alert.alert('Aquí se debería abrir un "Quienes somos"');
  }

  return (
    <TouchableOpacity style={globalStyles.header} onPress={onPressHandler} >
      <MaterialCommunityIcons 
        name="information-outline" 
        style={{ position: 'absolute', right: 15, }} 
        size={25} 
        color='white' 
      />
    </TouchableOpacity>
  );
}