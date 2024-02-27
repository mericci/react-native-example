import React, {useState} from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Map from '../map/Map';
import ProfesionalsList from '../profesionalsList/ProfesionalsList';
import AdvancedSearch from '../advancedSearch/AdvancedSearch';
import GuidedSearch from '../guidedSearch/GuidedSearch';

export default function Search({navigation}) {
  const [mapSelected, setMapSelected] = useState(true)
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [guidedSearch, setGuidedSearch] = useState(false);
  const [resultsExists, setResultsExists] = useState(true);

  const handleMapToggle = () => {
    setMapSelected(!mapSelected)
  }

  const toggleFiltersVisible = () => {
    setFiltersVisible(!filtersVisible);
  }

  const toggleGuidedSearch = () => {
    setGuidedSearch(!guidedSearch)
  }

  return(
    <View style={styles.container}>
      <Modal transparent={true} visible={filtersVisible} animationType='fade'>
        { !guidedSearch ? <AdvancedSearch setFiltersVisible={toggleFiltersVisible} toggleGuidedSearch={toggleGuidedSearch} map={mapSelected}/> : 
                         <GuidedSearch setFiltersVisible={toggleFiltersVisible} toggleGuidedSearch={toggleGuidedSearch} /> }
      </Modal>
      { mapSelected ? <Map handleMapToggle={handleMapToggle} toggleFiltersVisible={toggleFiltersVisible} navigation={navigation}/> 
        : <ProfesionalsList handleMapToggle={handleMapToggle} toggleFiltersVisible={toggleFiltersVisible} navigation={navigation}/> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1
  },
  buttonCallout: {
    flex: 1,
    flexDirection:'row',
    position:'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});