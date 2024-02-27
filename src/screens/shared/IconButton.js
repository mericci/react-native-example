import React from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import { colors } from '../../../assets/styles/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IconButton({ onPress, icon, color }) {

  var backColor = 'gray';
  if (color) {
    if (color in colors) {
      backColor = colors[color];
    } else {
      backColor = color;
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, backgroundColor: backColor }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={31}
        style={{ color: 'white' }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    width: 50,
    height: 50,
  },
})