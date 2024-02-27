import React, {useState, useEffect} from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import BasicInfo from './BasicInfo';
import AddPhoto from './AddPhoto';
import Studies from './Studies';
import Specialties from './Specialties';
import Certificates from './Certificates';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
const { ReactNativeFile } = require('apollo-upload-client');
import * as SecureStore from 'expo-secure-store';
import { FAB, Divider } from 'react-native-paper';

import validateRut from '../../../handlers/ValidateRut';
yup.addMethod(yup.string, 'validateRut', validateRut);

function validatePriority(ref, msg) {
  return yup.mixed().test({
    name: 'validatePriority',
    exclusive: false,
    message: msg || '',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      var specialty = this.resolve(ref);
      if(value === undefined || specialty === undefined){
        return true
      }
      else if (value.length === specialty.length){
        return true;
      }
      return false;
    },
  });
}

yup.addMethod(yup.mixed, 'validatePriority', validatePriority);


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
  dv: yup.string().matches(/^[0123456789kK]+$/, 'Invalido').required('*'),//.validateRut(yup.ref('rut'), 'RUT'),
  gender: yup.string().required('Campo es obligatorio'),
  profesional_type: yup.array().min(1, 'Campo obligatorio').required(), 
  hight_specialty: yup.array().max(2, 'Máximo 2 especialidades').required(),
  medium_specialty: yup.array().max(2, 'Máximo 2 especialidades'),
  low_specialty: yup.array().max(2, 'Máximo 2 especialidades')
})

export default function ProfesionalRegisterForm() {
  const [studiesSelect, setstudiesSelect] = useState([])
  const [filesUpload, setFilesUpload] = useState({})
  const [profilePhoto, setProfilePhoto] = useState({})
  const [askPhoto, setAskPhoto] = useState(false)
  const [sending, setSending] = useState(false);
  const [countFiles, setCountFiles] = useState(0);
  
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  
  const { loading, data, error } = useQuery(queries.getUniversitiesAndSpecialtiesQuery);
  const [register, { registerData }] = useMutation(queries.registerProfesional)
  const [login, { loginData }] = useMutation(queries.loginEmailQuery)
  
  useEffect(() => { 
    //creo cache para guardar rchivos de registro
    //FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory+'/registerFiles')

    dispatch({ type: 'WAIT_DATA_REGISTER', });
    const onCompleted = (data) => {
      dispatch({ type: 'GET_DATA_REGISTER', 
      payload: {
        especialidades: data.allEspecialidades.edges,
        universidades: data.allUniversidades.edges, 
        tipoProfesional: data.allTiposProfesionales.edges
      }})
    }
    const onError = (error) => {
      console.log(error)
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error){
        onCompleted(data)
      } else if (onError && !loading && error){
        onError(error)
      }
    }
  }, [loading, data, error])
  
  
  const specialtyInput = (hight, medium, low) => {
    var input = [];
    for(var i = 0; i < hight.length; i++){
      input.push({'especialidad': '"' + hight[i] + '"' , 'prioridad': 'ALTA' })
    }
    for(var j = 0; j < medium.length; j++){
      input.push({'especialidad': '"' + medium[j] + '"' , 'prioridad': 'MEDIA' })
    }
    for(var k = 0; k < low.length; k++){
      input.push({'especialidad': '"' + low[k] + '"' , 'prioridad': 'BAJA' })
    }
    //input = input.concat("]");
    return input;
  };
  
  
  const dataToArray = (array) => {
    var input = [];
    for(var i = 0; i < array.length; i++){
      input.push('"' + array[i] + '"')
    }
    return input;
  };
  
  const setToken = async(token) => {
    await SecureStore.setItemAsync('access_token', token).then(response =>
      console.log('finalizado')
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
          professionalId: response.data.tokenAuth.user.profesional.id,
          pacientId: undefined,
          isProfesional: true
        }})
        setToken(response.data.tokenAuth.token)
      } 
    });
  };   
  
  const makeRut = (rut, dv) => {
    rut = rut + '-' + dv;
    return rut
  }

  const setArchivos = (data) => {
    var archivos = []
    Object.entries(data).forEach(item => {
      const doc = new ReactNativeFile({
        uri: item[1].uri,
        name: item[1].name,
        type: item[1].type + '/*'
      });
      console.log(doc)
      archivos.push({'archivo': doc, 'tipoArchivo':'"' + item[0] + '"'})
    });
    return archivos
  }
 
  const reviewFiles = (data) => {
    if(countFiles){
      return true;
    }
    var count = 0;
    Object.entries(data).forEach(item => {
      if(item[1] === ''){
        return false;
      }
      count++;
    });
    if(count === countFiles){
      return true;
    } else {
      return false;
    }
  }
  
  const handleSubmit = (values, setSubmitting) => { //se puede agregar atributo action que sea create o edit, para definir el editar con el mismo form
    if(reviewFiles(filesUpload)){
      setSending(true);
      register({ variables : {
        archivos: setArchivos(filesUpload),
        username: values.email,
        email: values.email,
        password: values.password,
        nombre: values.name,
        apellido: values.lastname,
        rut: makeRut(values.rut, values.dv),
        genero: values.gender,
        fechaNacimiento: values.birthdate,
        estudiosSet: values.studies,
        tipoProfesionalesSet: dataToArray(values.profesional_type),
        especialidadesSet: specialtyInput(values.hight_specialty, values.medium_specialty, values.low_specialty),
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
    } else {
      alert('Ingresa los documentos solicitados');
    }
    
  };
  
  
  if(state.register.fetchData){
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
          studies: [],
          description: '',
          universidad: '',
          grado: '',
          profesional_type: '[]', 
          hight_specialty: [],
          medium_specialty: [],
          low_specialty: [],
        }}
        validationSchema = {ReviewSchema}
        onSubmit={
          (values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }
        }
      >
        {(formikProps) => (
          <View style={{ flex: 1}}>
            <ScrollView style={{ flex: 1, marginBottom: 10 }} contentContainerStyle={{ paddingBottom: 10 }}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                  <View style={{...globalStyles.segment, width: '90%' }}>
                    <Text style={globalStyles.segmentTitle}>Información básica</Text>
                    <Divider style={{marginBottom: 10}}/>
                    <BasicInfo formikProps={formikProps} profesional={true}/>
                    <AddPhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} askPhoto={askPhoto} setAskPhoto={setAskPhoto}/>
                  </View>
                  <View style={{...globalStyles.segment, width: '90%' }}>
                    <Text style={globalStyles.segmentTitle}>Información académica</Text>
                    <Divider style={{marginBottom: 10}}/>
                    <Studies 
                      formikProps={formikProps}
                      data={data}
                      studiesSelect={studiesSelect}
                      setstudiesSelect={setstudiesSelect}
                    />
                  </View>
                  <View style={{...globalStyles.segment, width: '90%' }}>
                    <Text style={globalStyles.segmentTitle}>Especialidades</Text>
                    <Divider style={{marginBottom: 10}}/>
                    <Specialties formikProps={formikProps} />
                  </View>
                  <View style={{...globalStyles.segment, width: '90%' }}>
                    <Text style={globalStyles.segmentTitle}>Documento de respaldo</Text>
                    <Divider style={{marginBottom: 10}}/>
                    <Certificates formikProps={formikProps} filesUpload={filesUpload} setFilesUpload={setFilesUpload} setCountFiles={setCountFiles}/>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
            <FAB 
              label='Registrarse' 
              onPress={formikProps.values.studies = studiesSelect, formikProps.handleSubmit} 
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