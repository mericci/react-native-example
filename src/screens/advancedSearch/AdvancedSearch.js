import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../../../assets/styles/Global';
import { FAB } from 'react-native-paper'

import AdvancedSearchForm from './components/AdvancedSearchForm';

export default function AdvancedSearch({setFiltersVisible, toggleGuidedSearch, map}) {

  return(
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <TouchableWithoutFeedback onPress={() => setFiltersVisible(false)}>
        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.15}}></View>
      </TouchableWithoutFeedback>
      <View style={{...globalStyles.searchModal, height: '50%'}}>
        <View style={globalStyles.searchModalHeader}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>Búsqueda avanzada</Text>
        </View>
        <AdvancedSearchForm setFiltersVisible={setFiltersVisible} toggleGuidedSearch={toggleGuidedSearch} map={map}/>
      </View>
      <View style={{...globalStyles.searchModal, marginTop: 10, backgroundColor: 'transparent', shadowOpacity: 0.8, shadowRadius: 2, elevation: 2 }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginVertical: 15 }}>
          ¿No sabes qué necesitas?
        </Text>
      </View>
      <FAB 
        label='Ir a búsqueda asistida'
        onPress={toggleGuidedSearch} 
        color='white'
        style={{ width: '90%', alignSelf: 'center'}}
      />
    </View>
  );
}
