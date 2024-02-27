import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';

import { globalStyles } from '../../../../assets/styles/Global';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { colors } from '../../../../assets/styles/Colors';

import StartHourSelector from './StartHourSelector';
import FinalHourSelector from './FinalHourSelector';
import ModalidadSelector from './ModalidadSelector';

function validatePrice(ref, msg) {
  return yup.mixed().test({
    name: 'validatePrice',
    exclusive: false,
    message: msg || '',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      var max_price = this.resolve(ref);
      if(value === undefined || max_price === undefined){
        return true
      }
      else if (value <= max_price){
        return true;
      }
      return false;
    },
  });
}

yup.addMethod(yup.mixed, 'validatePrice', validatePrice);

const ReviewSchema = yup.object({
  day: yup.string().required("Requerido"),
  start_hour: yup.string().required("Requerido"),
  final_hour: yup.string().required("Requerido"),
  min_price: yup.number().validatePrice(yup.ref('max_price'), 'Mínimo debe ser menor al máximo').required("Requerido"),
  max_price: yup.number().required("Requerido"),
  prevision: yup.string().required("Requerido"),
  atencion: yup.string().required("Requerido")
})

var private_props = [
  {label: 'Consulta pública', value: false },
  {label: 'Consulta privada', value: true },
];

var atention_options =[
  {label: 'Presencial', value: 'Presencial'},
  {label: 'Video Conferencia', value: 'Videoconferencia'},
  {label: 'Cualquiera', value: 'Cualquiera'}
]

export default function CreateConsultationForm({setShow, mode, navigation, ubicationId, consultation}) {
  const [privates, setPrivates] = useState(0);
  const [modalidadSelect, setModalidadSelect] = useState([]);
  
  state = useSelector(state => state);
  dispatch = useDispatch();
  
  const { data, loading, error } = useQuery(queries.getConsultationFields(ubicationId));
  const [createConsultation, { createConsultationData }] = useMutation(queries.createConsultation)
  const [editConsultation, { editConsultationData }] = useMutation(queries.editConsultation)
  
  
  const modalidadesDisplay = () => {
    var children = data.allModalidades.edges.map(item => {
      return { 'name': item.node.nombre, 'id': item.node.id }
    });
    return [{ 'name': 'Modalidades', 'children': children }]
  }
  
  const dataToArray = (array) => {
    var input = [];
    for(var i = 0; i < array.length; i++){
      input.push('"' + array[i] + '"')
    }
    return input;
  };
  
  const handleSubmit = (values, setSubmitting) => {
    if(mode === 'create'){
      createConsultation({ variables : {
        min_price: parseInt(values.min_price),
        max_price: parseInt(values.max_price),
        private: values.private,
        start_hour: values.start_hour,
        final_hour: values.final_hour,
        day: values.day,
        atencion: values.atencion,
        modalidades: dataToArray(values.modalidades),
        profesional: state.isLogin.professionalId,
        ubicacion: ubicationId,
        prevision: values.prevision
      }})
      .then((json) => {
        if("errors" in json) {
          alert('Creación Falló');
          setSubmitting(false)
        } else {
          setSubmitting(false)
          setShow(false)
          
        }
      })
    } else if(mode === 'edit') {
      editConsultation({ variables : {
        min_price: parseInt(values.min_price),
        max_price: parseInt(values.max_price),
        private: values.private,
        start_hour: values.start_hour,
        final_hour: values.final_hour,
        day: values.day,
        atencion: values.atencion,
        modalidades: dataToArray(values.modalidades),
        ubicacionId: ubicationId,
        prevision: values.prevision,
        consultaId: consultation.id
      }})
      .then((json) => {
        if("errors" in json) {
          alert('Creación Falló');
          setSubmitting(false)
        } else {
          setSubmitting(false)
          setShow(false)
          
        }
      })
    }
  };
    
  useEffect(() => {
    const onCompleted = (data) => {
      {}
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
  }, [loading, data, error]);
    
  return (
    <View style={styles.centeredView}>
      <TouchableWithoutFeedback onPress={() => setShow(false)}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      {(loading) ? <ActivityIndicator/> :  
        <Formik
          initialValues={{
            day: '',
            start_hour: '00:00:00',
            final_hour: '01:00:00',
            min_price: '',
            max_price: '',
            private: false,
            prevision: '',
            modalidades: [],
            profesional: '',
            atencion: ''
          }}
          validationSchema = {ReviewSchema}
          onSubmit={
            (values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);    
            }
          }
        >
        {(formikProps) => (
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>Crear consulta</Text>
            </View>

            <ScrollView style={{flex: 1}} contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}>
              <TextInput 
                label='Día de la Semana'
                value=' '
                mode='outlined'
                dense
                error={formikProps.touched.day && formikProps.errors.day}
                render={ inputProps => 
                  <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    items={ data.allDias.edges.map(item => ({label: item.node.nombre, value: item.node.id}))}
                    onOpen={inputProps.onFocus}
                    onClose={inputProps.onBlur}
                    placeholder={{label: 'Selecciona Día'}}
                    onValueChange={(value) => {
                      if (value) {
                        formikProps.values.day = value
                      } else {
                        formikProps.values.day = ''
                      }
                    }}
                  />
                }
              />
              { formikProps.touched.day && formikProps.errors.day ? 
                <Text style={globalStyles.errorText}>{formikProps.touched.day && formikProps.errors.day}</Text> : <View></View> 
              }
            
              <View style={{flexDirection:"row", marginTop: 9}}>
                <View style={{ flex:1, marginRight:10 }}>
                  <StartHourSelector formikProps={formikProps}/>
                </View>
                <View style={{ flex:1, }}>
                  <FinalHourSelector formikProps={formikProps}/>
                </View>
              </View>

              <View style={{flexDirection:"row", marginTop: 9}}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <TextInput 
                    label='Precio Minimo'
                    mode='outlined'
                    dense
                    onChangeText={formikProps.handleChange('min_price')}
                    error={formikProps.touched.min_price && formikProps.errors.min_price}
                    onBlur={formikProps.handleBlur('min_price')}
                    keyboardType="number-pad" 
                  />
                  { formikProps.touched.min_price && formikProps.errors.min_price ? 
                    <Text style={globalStyles.errorText}>{formikProps.touched.min_price && formikProps.errors.min_price}</Text> : <View></View> 
                  }
                </View>
                <View style={{ flex: 1, }}>
                  <TextInput 
                    label='Precio Máximo'
                    mode='outlined'
                    dense
                    onChangeText={formikProps.handleChange('max_price')}
                    error={formikProps.touched.max_price && formikProps.errors.max_price}
                    onBlur={formikProps.handleBlur('max_price')}
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                  />
                  { formikProps.touched.max_price && formikProps.errors.max_price ? 
                    <Text style={globalStyles.errorText}>{formikProps.touched.max_price && formikProps.errors.max_price}</Text> : <View></View> 
                  }
                </View>
              </View>

              <TextInput 
                label='Prevision'
                value=' '
                mode='outlined'
                dense
                error={formikProps.touched.prevision && formikProps.errors.prevision}
                style={{ marginTop: 8, }}
                render={ inputProps => 
                  <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    items={ data.allPrevisiones.edges.map(item => ({label: item.node.nombre, value: item.node.id}))}
                    onOpen={inputProps.onFocus}
                    onClose={inputProps.onBlur}
                    placeholder={{label: 'Selecciona Previsión'}}
                    onValueChange={(value) => {
                      if (value) {
                        formikProps.values.prevision = value
                      } else {
                        formikProps.values.prevision = ''
                      }
                    }}
                  />
                }
              />
              { formikProps.touched.prevision && formikProps.errors.prevision ? 
                <Text style={globalStyles.errorText}>{formikProps.touched.prevision && formikProps.errors.prevision}</Text> : <View></View> 
              }

              <TextInput 
                label='Tipo de Atención'
                value=' '
                mode='outlined'
                dense
                error={formikProps.touched.atencion && formikProps.errors.atencion}
                style={{ marginTop: 8, }}
                render={ inputProps => 
                  <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    items={ atention_options }
                    onOpen={inputProps.onFocus}
                    onClose={inputProps.onBlur}
                    placeholder={{label: 'Selecciona tipo de atención'}}
                    onValueChange={(value) => {
                      if (value) {
                        formikProps.values.atencion = value
                      } else {
                        formikProps.values.atencion = ''
                      }
                    }}
                  />
                }
              />
              { formikProps.touched.atencion && formikProps.errors.atencion ? 
                <Text style={globalStyles.errorText}>{formikProps.touched.atencion && formikProps.errors.atencion}</Text> : <View></View> 
              }
              
              <ModalidadSelector 
                modalidadSelect={modalidadSelect} 
                setModalidadSelect={setModalidadSelect} 
                formikProps={formikProps} 
                modalidades={modalidadesDisplay()}
              />
              { formikProps.touched.modalidades && formikProps.errors.modalidades ? 
                <Text style={globalStyles.errorText}>{formikProps.touched.modalidades && formikProps.errors.modalidades}</Text> : <View></View> 
              }

              <View style={{ alignSelf: 'center', marginTop: 20 }}>
                <RadioForm
                  formHorizontal={true}
                  radio_props={private_props}
                  animation={true}
                  initial={privates}
                  onPress={
                    (value) => {setPrivates(value) ,formikProps.values.private = value}
                  }
                  buttonSize={12}
                  buttonColor={'#2196f3'}
                  labelStyle={{fontSize: 16, color: 'black', marginRight: 10, }}
                  value={formikProps.values.private}
                />
              </View>
          
            </ScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 20, marginTop: 10, }}>
              <Button 
                onPress={() => setShow(false)}
                color={colors.danger}
                compact
                mode='contained'
                style={{ flex: 1, marginHorizontal: 10 }}
              >Cancelar</Button>
              {
                mode==='create' ?
                <Button 
                  onPress={formikProps.handleSubmit}
                  color={colors.link}
                  compact
                  mode='contained'
                  style={{ flex: 1, marginHorizontal: 10 }}
                >Crear</Button>
                :
                <Button 
                  onPress={formikProps.handleSubmit}
                  color={colors.link}
                  compact
                  mode='contained'
                  style={{ flex: 1, marginHorizontal: 10 }}
                >Editar</Button>
              }
            </View>
          </View>
        )}  
      </Formik>}
    </View>
  )
}
        
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    paddingLeft: 14,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
  },
  inputAndroid: {
    color: 'black',
    paddingLeft: 14,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    height: '70%',
  },
  background: {
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  header: {
    padding: 18,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});