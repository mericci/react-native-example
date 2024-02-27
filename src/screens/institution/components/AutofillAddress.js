import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import Constants from 'expo-constants';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItems from './LocationItems';
import { TextInput } from 'react-native-paper';

export default function AutofillAddress({ props }) {
  const [address, setAddress] = useState('')
  const [showList, setShowList] = useState(false)
  const addressField = React.createRef();

  const api_key = Constants.manifest.extra.googleApiKey;

  const handlePress = (item) => {
    setAddress(item.description)
    setShowList(false)
    props.values.address = item.description
  }

  return(
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
            />
          )}
        </View>
      )}
    </GoogleAutoComplete>
  );
}
