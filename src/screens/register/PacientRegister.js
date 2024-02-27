import React from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../assets/styles/Colors';
import { Button } from 'react-native-paper';

import PacientRegisterForm from './components/PacientRegisterForm';

export default function PacientRegister({ navigation }) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  return(
    <LinearGradient colors={[colors.primary, '#192f6a']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}> 
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 20 }}>
            <Button 
              icon='home' 
              color='white' 
              style={{ alignSelf: 'flex-start' }}
              labelStyle={{ fontSize: 15 }}
              onPress={() => navigation.navigate('Home')}
            >Volver al inicio</Button>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 10 }}>
              Registro
            </Text>
            <Text style={{ fontSize: 17, color: 'white', marginTop: 2, }}>
              Usuario
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <PacientRegisterForm />
      </SafeAreaView>
    </LinearGradient>
  );
}
