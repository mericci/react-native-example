import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Loading() {
  return (
    <View style={globalStyles.container}>
      <Spinner 
        visible={true}
        textContent={'Cargando...'}
        textStyle={globalStyles.spinnerText}
      />
    </View>
  );
}