import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import MainButton from '../../shared/MainButton';
import { TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function LoginForm() {
  const dispatch = useDispatch();

  const [loginEmail, { dataEmail }] = useMutation(queries.loginEmailQuery)

  const setToken = async(token) => {
    await SecureStore.setItemAsync('access_token', token).then(response =>
      {}
    ) 
  }

  function handleLogin(values, setSubmitting) {
    loginEmail({ variables: { identifier: values.username, password: values.password }})
      .then(response => {
        if (response.data.tokenAuth.success) {
          try{
            if(response.data.tokenAuth.user.profesional.id !== null){
              dispatch({ type: 'LOGIN', payload: {
                token: response.data.tokenAuth.token,
                username: response.data.tokenAuth.user.username,
                id: response.data.tokenAuth.user.id,
                professionalId: response.data.tokenAuth.user.profesional.id,
                pacientId: undefined,
                isProfesional: true
              }});
              setToken(response.data.tokenAuth.token)
              dispatch({ type: 'CLOSE_LOGIN_MODAL' })
            } 
          }
          catch{
            if(response.data.tokenAuth.user.paciente.id){
              dispatch({ type: 'LOGIN', payload: {
                token: response.data.tokenAuth.token,
                username: response.data.tokenAuth.user.username,
                id: response.data.tokenAuth.user.id,
                professionalId: undefined,
                pacientId: response.data.tokenAuth.user.paciente.id,
                isProfesional: false
              }});
              setToken(response.data.tokenAuth.token)
              dispatch({ type: 'CLOSE_LOGIN_MODAL' })
            }
          }
        } else {
          alert('Email o contraseña inválidos');
          setSubmitting(false);
        }
      })
  }

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values, setSubmitting)
        }}
      >
        {(formikProps) => (
          <View style={{ alignItems: 'center', width: '100%', }}>
            <TextInput
              label='Email'
              placeholder='usuario'
              autoCapitalize="none" 
              onChangeText={formikProps.handleChange('username')}
              value={formikProps.values.username}
              style={{ width: '100%', marginVertical: 5, }}
              //mode='outlined'
              dense={true}
            />
            <TextInput
              label='Contraseña'
              placeholder='*******'
              secureTextEntry={true}
              onChangeText={formikProps.handleChange('password')}
              value={formikProps.values.password}
              style={{ width: '100%', marginVertical: 4, }}
              //mode='outlined'
              dense={true}
            />
            <MainButton 
              title='Ingresar' 
              onPress={formikProps.handleSubmit}
              loading={formikProps.isSubmitting}
              color='secondary'
              size='small'
            />
          </View>
        )}
      </Formik>
    </View>
  )
}