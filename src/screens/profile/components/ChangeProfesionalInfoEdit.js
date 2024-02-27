import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { Formik } from 'formik';
import * as yup from 'yup';
const { ReactNativeFile } = require('apollo-upload-client');
import { Divider, Button, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../../assets/styles/Colors';

import Certificates from './Certificates'
import Specialties from '../../register/components/Specialties'
import Studies from '../../register/components/Studies'
import AddPhoto from '../../register/components/AddPhoto'


const ReviewSchema = yup.object({
    profesional_type: yup.array().min(1, 'Campo obligatorio').required(), 
    hight_specialty: yup.array().max(2, 'Máximo una especialidad').required(),
    medium_specialty: yup.array().max(2, 'Máximo una especialidad'),
    low_specialty: yup.array().max(2, 'Máximo una especialidad')
  })

export default function ChangeProfesionalInfoEdit({navigation}) {
  const [studiesSelect, setstudiesSelect] = useState([])
  const [filesUpload, setFilesUpload] = useState({})
  const [profilePhoto, setProfilePhoto] = useState({})
  const [askPhoto, setAskPhoto] = useState(false)
  const [countFiles, setCountFiles] = useState(0);
  const [sending, setSending] = useState(false);

  state = useSelector(state => state);
  dispatch = useDispatch();
  
  const { loading, data, error } = useQuery(queries.getUniversitiesAndSpecialtiesQuery);
  const [editProfesional, { editProfesionalData }] = useMutation(queries.createSolicitudEditProfesional)

  useEffect(() => { 
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
      {}
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
      editProfesional({ variables : {
        profesionalId: state.isLogin.professionalId,
        archivos: setArchivos(filesUpload),
        estudiosSet: values.studies,
        tipoProfesionalesSet: dataToArray(values.profesional_type),
        especialidadesSet: specialtyInput(values.hight_specialty, values.medium_specialty, values.low_specialty),
        photo: profilePhoto
      }})
      .then((json) => {
        setSending(false);
        if("errors" in json) {
          alert('Cambio de Contraseña Falló');
          setSubmitting(false)
        } else {
          setSubmitting(false)
          navigation.navigate('Profile');
        }
      })
    } else {
      alert('Ingresa los documentos solicitados');
    }
  
  }
    

  if(loading){
    return (<ActivityIndicator/>)
  } else {
    return(
      <ScrollView style={{ flex: 1}} contentContainerStyle={{ paddingBottom: 10 }} >
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{
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
              <View>
                <View style={globalStyles.segment}>
                  <Text style={globalStyles.segmentTitle}>Foto de perfil</Text>
                  <Divider style={{marginBottom: 10}}/>
                  <AddPhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} askPhoto={askPhoto} setAskPhoto={setAskPhoto}/>
                </View>
                <View style={globalStyles.segment}>
                  <Text style={globalStyles.segmentTitle}>Información académica</Text>
                  <Divider style={{marginBottom: 10}}/>
                  <Studies 
                    formikProps={formikProps}
                    data={data}
                    studiesSelect={studiesSelect}
                    setstudiesSelect={setstudiesSelect}
                  />
                </View>
                <View style={globalStyles.segment}>
                  <Text style={globalStyles.segmentTitle}>Especialidades</Text>
                  <Divider style={{marginBottom: 10}}/>
                  <Specialties formikProps={formikProps} />
                </View>
                <View style={globalStyles.segment}>
                  <Text style={globalStyles.segmentTitle}>Documento de respaldo</Text>
                  <Divider style={{marginBottom: 10}}/>
                  <Certificates formikProps={formikProps} filesUpload={filesUpload} setFilesUpload={setFilesUpload} setCountFiles={setCountFiles}/>
                </View>
              
                <Button 
                  mode='contained'
                  color={ colors.link }
                  icon='check'
                  style={{ marginVertical: 10, width: '90%', alignSelf: 'center' }}
                  onPress={formikProps.values.studies = studiesSelect, formikProps.handleSubmit}
                  loading={sending}
                  disabled={sending}
                >Confirmar Cambios</Button>
              </View>
            )} 
          </Formik>
        </View>
      </ScrollView>
    );
  }
}
