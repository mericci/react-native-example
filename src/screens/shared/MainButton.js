import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../assets/styles/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';

export default function MainButton({ title, onPress, icon, color, disabled, loading, size }) {

  var backColor = 'gray';
  if (color) {
    if (color in colors) {
      backColor = colors[color];
    } else {
      backColor = color;
    }
  }

  var sizes = { button: styles.button, text: styles.text }
  if (size) {
    if (size == 'small') {
      sizes = { button: styles.buttonSmall, text: styles.textSmall }
    }
  }

  if (loading) {
    return (
      <View style={{ ...sizes.button, backgroundColor: backColor }}>
        <ActivityIndicator color='white'/>
      </View>
    )
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ ...sizes.button, backgroundColor: backColor, alignSelf: 'center' }}
      > 
        { !icon ? 
          <Text
            style={{ ...sizes.text , marginVertical: 6, textAlign: 'center', }}
          >
            {title}
          </Text> :
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',}}
          > 
            <Text
              style={{ ...styles.text }}
            >{title}</Text>
            <MaterialCommunityIcons 
              name={icon}
              size={ size == 'small' ? (28) : (30)}
              style={{ color: 'white' }} 
            />
          </View>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 7,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonSmall: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18,
  },
  textSmall: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 17,
  }
})