import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../../assets/styles/Global';
import Constants from 'expo-constants';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItems from './components/LocationItems';
import { TextInput, Divider, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../../assets/styles/Colors';

export default function AutofillAddress({ navigation }) {
  const [address, setAddress] = useState('')
  const [showList, setShowList] = useState(false)
  const action = navigation.getParam('action');

  const api_key = Constants.manifest.extra.googleApiKey;

  const handlePress = (item, props) => {
    setAddress(item.description)
    setShowList(false)
    props.values.address = item.description
  }

  const reviewSchema = yup.object({
    address: yup.string().required('Debe ingresar dirección'),
  })

  const onSubmitHandler = (values) => {
    if (action == 'add') {
      navigation.navigate('SetUbication', {
        region: navigation.getParam('region'),
        city: navigation.getParam('city'),
        address: values.address,
        action: action
      })
    } else if (action == 'create') {
      navigation.navigate('SetUbication', {
        archivos: navigation.getParam('archivos'),
        name: navigation.getParam('name'),
        description: navigation.getParam('description'),
        region: navigation.getParam('region'),
        city: navigation.getParam('city'),
        address: values.address,
        action: action
      })
    }
  }

  return(
    <View style={globalStyles.segment}>
      <Text style={globalStyles.segmentTitle}>Ingresar dirección</Text>
      <Divider />
      <Text style={globalStyles.segmentText}>
        Por favor, ingresa la dirección completa de la sede a agregar. Luego, confirma en el mapa.
      </Text>
      <Formik 
        initialValues={{ address: '' }}
        onSubmit={(values) => onSubmitHandler(values)}
        validationSchema={reviewSchema}
      >
        {(props) => (
          <GoogleAutoComplete 
            apiKey={api_key} 
            minLength={4}
            language='es'
            components='country:cl'
          >
            {({ handleTextChange, locationResults, inputValue, clearSearch }) => (
              <View>
                <TextInput
                  label="Dirección"
                  mode='outlined'
                  dense={true}
                  value={address}
                  onChangeText={(value) => {
                    setShowList(true)
                    setAddress(value)
                    handleTextChange(value)
                    props.values.address = value
                  }}
                  error={ props.touched.address && props.errors.address }
                  onBlur={props.handleBlur('address')}
                  style={{ marginTop: 8 }}
                />
                { props.touched.address && props.errors.address ? 
                  <Text style={globalStyles.errorText}>{props.touched.address && props.errors.address}</Text> : <View></View> 
                }
                { inputValue.length < 4 || !showList ? <View></View> : (
                  <LocationItems 
                    items={locationResults} 
                    handlePress={handlePress} 
                    clearSearch={clearSearch}
                    inputValue={inputValue}
                    props={props}
                  />
                )}
                <View style={{ marginVertical: 10, }}></View>
                <Button 
                  mode='contained' 
                  color={colors.link}
                  onPress={props.handleSubmit}
                >Siguiente</Button>
              </View>
            )}
          </GoogleAutoComplete>
        )}
      </Formik>
    </View>
  );
}
