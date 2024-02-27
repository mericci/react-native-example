import React from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, Image, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import IconButton from '../shared/IconButton';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from './components/LoginForm';
import { colors } from '../../../assets/styles/Colors';

export default function LoginModal() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const closeModal = () => dispatch({ type: 'CLOSE_LOGIN_MODAL' })

    return(
      <Modal visible={state.loginModal.visible} animationType='slide'>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <LinearGradient colors={[colors.primary, '#192f6a']} style={globalStyles.loginModalContainer}>
            <View style={globalStyles.loginImageContainer}>
              <Image style={globalStyles.loginImage} source={require('../../../assets/images/logo.png')}/>
            </View>
            <View style={globalStyles.loginFormContainer}>
              {state.isLogin.login &&
                  <Text style={globalStyles.titleText}></Text>
              }
              <LoginForm />
            </View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <IconButton 
                icon='close'
                onPress={closeModal}
                color='danger'
              />
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </Modal>
    );
}