import React, {useState, useEffect} from 'react';
import { View, Text, ActivityIndicator, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import * as SecureStore from 'expo-secure-store';
import { FAB, Divider } from 'react-native-paper';

import BasicInfo from './BasicInfo';
import AddPhoto from './AddPhoto';
import { queries } from '../../../handlers/Queries';

import validateRut from '../../../handlers/ValidateRut';
import { ScrollView } from 'react-native-gesture-handler';
yup.addMethod(yup.string, 'validateRut', validateRut);


function validatePassword(ref, msg) {
  return yup.mixed().test({
    name: 'validatePassword',
    exclusive: false,
    message: msg || '',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      var password2 = this.resolve(ref);
      if(value === password2){
          return true
      } else {
          return false;
      }
      
    },
  });
}

yup.addMethod(yup.mixed, 'validatePassword', validatePassword);

const ReviewSchema = yup.object({
    name: yup.string().required('Nombre es obligatorio'),
    lastname: yup.string().required('Apellido es obligatorio'), 
    password: yup.string().required('Contraseña requerida')
                          .min(8, 'Contraseña muy corta - debe tener mínimo 8 caracteres')
                          .matches(/(?=.*[0-9])/, 'Contraseña debe contener al menos un número'),
    password2: yup.string().validatePassword(yup.ref('password'), 'Contraseña no coincide').required('Campo obligatorio'),
    email: yup.string().email('Debes ingresar un email válido').required('Email es obligatorio'),
    rut: yup.string().validateRut(yup.ref('dv'), 'RUT inexistente').required('RUT es obligatorio'),
    dv: yup.string().matches(/^[0123456789kK]+$/, 'Invalido').required('*'),
    gender: yup.string().required('Campo es obligatorio'),
})

export default function PacientRegisterForm () {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [profilePhoto, setProfilePhoto] = useState({})
  const [askPhoto, setAskPhoto] = useState(false)
  const [sending, setSending] = useState(false);
  const [load, setLoad] = useState(true);
  const [register, { registerData }] = useMutation(queries.registerPacient)
  const [login, { loginData }] = useMutation(queries.loginEmailQuery)

  const setToken = async(token) => {
    await SecureStore.setItemAsync('access_token', token).then(response =>
      {}
    )  
  }

  const handleLogin = (values) => { 
    login({ variables: { identifier: values.email, password: values.password } })
    .then(response => {
      if (response.data.tokenAuth.success) {
        dispatch({ type: 'LOGIN', payload: {
          token: response.data.tokenAuth.token,
          username: response.data.tokenAuth.user.username,
          id: response.data.tokenAuth.user.id,
          professionalId: undefined,
          pacientId: response.data.tokenAuth.user.paciente.id,
          isProfesional: false
        }})
        setToken(response.data.tokenAuth.token)
      } 
    });
  };

  const makeRut = (rut, dv) => {
    rut = rut + '-' + dv;
    return rut
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const waitFunction = async () => {
    await sleep(300).then(()=>{setLoad(false)})
  }

  useEffect(() => {
    waitFunction()
  })

  const handleSubmit = (values, setSubmitting) => { //se puede agregar atributo action que sea create o edit, para definir el editar con el mismo form
    setSending(true);
    register({ variables : {
      username: values.email,
      email: values.email,
      password: values.password,
      nombre: values.name,
      apellido: values.lastname,
      rut: makeRut(values.rut, values.dv),
      genero: values.gender,
      fechaNacimiento: values.birthdate,
      photo: profilePhoto
    }})
    .then((json) => {
      setSending(false);
      if("errors" in json) {
        alert('Registro Falló');
        setSubmitting(false)
      } else {
        setSubmitting(false)
        handleLogin(values);
      }
    })
  };

  if(load){
    return (<ActivityIndicator/>)
  } else { 
    return (
      <Formik
        initialValues={{
          name: '',
          lastname : '',
          password: '',
          password2: '',
          email: '',
          rut: '',
          dv: '',
          gender: '',
          birthdate: String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1) +  '-' + String(new Date().getDate()),
        }}
        validationSchema = {ReviewSchema}
        onSubmit={
          (values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }
        }
      >
        {(formikProps) => (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginBottom: 10 }} contentContainerStyle={{ paddingBottom: 10 }}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{...globalStyles.segment, width: '90%' }}>
                  <Text style={globalStyles.segmentTitle}>Información básica</Text>
                  <Divider style={{ marginBottom: 10 }}/>
                  <BasicInfo formikProps={formikProps} profesional={false}/>
                  <AddPhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} askPhoto={askPhoto} setAskPhoto={setAskPhoto}/>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
            <FAB 
              label='Registrarse' 
              onPress={formikProps.handleSubmit} 
              color='white'
              style={{ marginHorizontal: 20, marginBottom: 10, }}
              loading={sending}
              disabled={sending}
            />
          </View>
        )}
      </Formik>
    )
  }
}