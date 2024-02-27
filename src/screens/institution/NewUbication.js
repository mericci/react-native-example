import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { globalStyles } from '../../../assets/styles/Global';
import { queries } from '../../handlers/Queries';
import { TextInput, Divider, Button, ActivityIndicator } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../../assets/styles/Colors';
import RNPickerSelect from 'react-native-picker-select';

export default function AddUbication({ navigation }) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const { data, loading, error } = useQuery(queries.getRegionsAndCities);
  const [cities, setCities] = useState([])
  const action = navigation.getParam('action');

  const reviewSchema = yup.object({
    region: yup.string().required('Debe ingresar region'),
    city: yup.string().required('Debe ingresar ciudad o comuna'),
  })

  const onRegionSelected = (id) => {
    if (id) {
      var region = data.allRegiones.edges.find(item => item.node.id == id )
      setCities(region.node.ciudadSet.edges.map(item => ({ label: item.node.nombre, value: item.node.id })))
    } else {
      setCities([])
    }
  }

  const onSubmitHandler = (values) => {
    if (action == 'add') {
      navigation.navigate('SetAddress', {region: values.region, city: values.city, action: action})
    } else if (action == 'create') {
      navigation.navigate('SetAddress', {
        archivos: navigation.getParam('archivos'),
        name: navigation.getParam('name'),
        description: navigation.getParam('description'),
        region: values.region, 
        city: values.city, 
        action: action
      })
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Nueva sede</Text>
        <Divider />
        <Text style={globalStyles.segmentText}>Por favor, ingresa la región y ciudad/comuna correspondiente a la nueva sede</Text>

        {loading ? <ActivityIndicator/> : (
          <Formik 
            initialValues={{ region: '', city: '' }}
            onSubmit={(values) => onSubmitHandler(values)}
            validationSchema={reviewSchema}
          >
            {(props) => (
              <View>
                <TextInput 
                  label='Región'
                  mode='outlined'
                  dense={true}
                  value=' '
                  error={ props.touched.region && props.errors.region }
                  style={{ marginTop: 8, }}
                  render={ (inputProps) => 
                    <RNPickerSelect 
                      items={ data.allRegiones.edges.map(item => ({label: item.node.nombre, value: item.node.id, key: item.node.id}))}
                      onOpen={inputProps.onFocus}
                      onClose={inputProps.onBlur}
                      onValueChange={(value) => {
                        if (value) {
                          props.values.region = value
                          inputProps.onChangeText(value)
                        } else {
                          props.values.region = ''
                          inputProps.onChangeText(' ')
                        }
                        onRegionSelected(value)
                      }}
                      style={{...pickerSelectStyles}}
                    />
                  }
                />
                { props.touched.region && props.errors.region ? 
                  <Text style={globalStyles.errorText}>{props.touched.region && props.errors.region}</Text> : <View></View> 
                }
        
                <TextInput 
                  label='Ciudad/comuna'
                  mode='outlined'
                  dense={true}
                  value=' '
                  error={ props.touched.city && props.errors.city }
                  style={{ marginTop: 8, }}
                  render={ (inputProps) => 
                    <RNPickerSelect 
                      items={cities}
                      onOpen={inputProps.onFocus}
                      onClose={inputProps.onBlur}
                      onValueChange={(value) => {
                        if (value) {
                          props.values.city = value;
                          inputProps.onChangeText(value)
                        } else {
                          props.values.city = '';
                          inputProps.onChangeText(' ')
                        }
                      }}
                      style={{...pickerSelectStyles}}
                    />
                  }
                />
                { props.touched.city && props.errors.city ? 
                  <Text style={globalStyles.errorText}>{props.touched.city && props.errors.city}</Text> : <View></View> 
                }
                <View style={{ marginVertical: 10, }}></View>
                <Button 
                  mode='contained' 
                  color={colors.link}
                  onPress={props.handleSubmit}
                >Siguiente</Button>
              </View>
            )}
          </Formik>
        )}
      </View>
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    paddingHorizontal: 14
  },
  inputAndroid: {
    height: 40,
    paddingHorizontal: 14,
  },
});