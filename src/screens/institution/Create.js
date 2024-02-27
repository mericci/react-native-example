import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../handlers/Queries'
import { TextInput, Divider, } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import MainButton from '../shared/MainButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { ReactNativeFile } = require('apollo-upload-client');

import Files from './components/Files';

export default function CreateInstitution({navigation}) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const [withUbication, setWithUbication] = useState(false)
  const [create, { createData }] = useMutation(queries.newSolicitudInstitucionWithoutUbication)
  const [isLoading, setLoading] = useState(false)
  const [filesUpload, setFilesUpload] = useState({})
  var checked = false;

  const reviewSchema = yup.object({
    name: yup.string().required('Debe ingresar nombre'),
    description: yup.string().required('Debe ingresar descripción'),
  })

  const setArchivos = (data) => {
    var archivos = []
    Object.entries(data).forEach(item => {
      const doc = new ReactNativeFile({
        uri: item[1].uri,
        name: item[1].name,
        type: item[1].type + '/*'
      });
      archivos.push({'archivo': doc, 'tipoArchivo':'"' + item[0] + '"'})
    });
    return archivos
  }

  const onSubmitHandler = (values) => {
    if (withUbication) {
      navigation.navigate('AddUbication', {
        archivos: setArchivos(filesUpload),
        name: values.name, 
        address: values.address, 
        description: values.description,
        region: values.region,
        city: values.city,
        action: 'create',
      })
    } else {
      setLoading(true)
      create({ variables : {
        archivos: setArchivos(filesUpload),
        name: values.name,
        description: values.description,
        professional: state.isLogin.professionalId,
      }})
      .then((json) => {
        if("errors" in json) {
          setLoading(false)
          alert('Registro Falló');
        } else {
          setLoading(false)
          navigation.navigate('InstitutionHome')
        }
      })
    }
  }

  if (isLoading) {
    return(
      <View style={globalStyles.container}>
        <ActivityIndicator/>
      </View>
    )
  } else {
    return(
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Formik 
              initialValues={{ name: '', description: '' }}
              onSubmit={(values) => onSubmitHandler(values)}
              validationSchema={reviewSchema}
            > 
              {(props) => (
                <View style={{ width: '100%', alignItems: 'center', flex: 1}}>
                  <View style={globalStyles.segment}>
                    <Text style={globalStyles.segmentTitle}>Información básica</Text>
                    <Divider />
                    <TextInput
                      label='Nombre'
                      onChangeText={props.handleChange('name')}
                      value={props.values.name}
                      error={ props.touched.name && props.errors.name }
                      onBlur={props.handleBlur('name')}
                      style={{ marginTop: 8, }}
                      mode='outlined'
                      dense={true}
                    />
                    { props.touched.name && props.errors.name ? 
                      <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text> : <View></View> 
                    }
                    <TextInput
                      label='Descripción'
                      onChangeText={props.handleChange('description')}
                      value={props.values.description}
                      error={ props.touched.description && props.errors.description }
                      onBlur={props.handleBlur('description')}
                      style={{ marginTop: 8, }}
                      mode='outlined'
                      dense={true}
                      multiline={true}
                    />
                    { props.touched.description && props.errors.description ? 
                      <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text> : <View></View> 
                    }
                  </View>
                  <View style={globalStyles.segment}>
                    <Text style={globalStyles.segmentTitle}>Ubicación</Text>
                    <Divider />
                    <Text style={globalStyles.segmentText}>
                      Si lo deseas, puede incluir la ubicación de una sede. Puedes agregar más sedes una vez creada la institución.
                    </Text>
                    <CheckBox
                      title='Deseo agregar una sede'
                      checked={withUbication}
                      onPress={() => setWithUbication(!withUbication)}
                    />
                  </View>

                  <View style={globalStyles.segment}>
                    <Text style={globalStyles.segmentTitle}>Archivos de Institución</Text>
                    <Divider />
                    <Files filesUpload={filesUpload} setFilesUpload={setFilesUpload}/>
                  </View>

                  <MainButton 
                    title={withUbication ? 'Siguiente' : 'Enviar solicitud'}
                    color='success'
                    size='small'
                    onPress={props.handleSubmit} 
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
