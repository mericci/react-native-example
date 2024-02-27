import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import { useQuery } from '@apollo/react-hooks';
import UbicationModal from './components/Modal'
import { queries } from '../../handlers/Queries';
import { FAB } from 'react-native-paper';

export default function Home({navigation, handleMapToggle, toggleFiltersVisible}) {
  const [isLoadingPosition, setLoadingPosition] = useState(true);
  const [selected, setSelected] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  state = useSelector(state => state);
  const dispatch = useDispatch();

  // Set own ubication
  const geoSuccess = (pos) => {
    dispatch({ type: 'SET_OWN_POSITION', payload: pos.coords })
    setLoadingPosition(false);
  }
  
  const geoError = (err) => {
    setLoadingPosition(false);
  }

  const { loading, data, error } = useQuery(queries.getAllUbicationsQuery);

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    const onCompleted = (data) => {
      dispatch({ type: 'GET_UBICATIONS', payload: data.allUbicaciones.edges });
    }
    const onError = (error) => {
      dispatch({ type: 'GET_UBICATIONS', payload: [] })
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error){
        onCompleted(data)
      } else if (onError && !loading && error){
        onError(error)
      }
    }
  }, [loading, data, error]);

  const redirect = (key) => {
    dispatch({ type: 'SET_UBICATION_ID', payload: key });
    navigation.navigate('InstitutionProfile', { checkProfile: true });
  }

  const filterubicationsSet = () => {
    if (state.search.searchResults) {
      return state.ubications.ubications.filter(ubication => {
        var present = false
        state.search.searchResults.ubicaciones.forEach(filterUbication => {
          if (filterUbication.id === ubication.node.id) {
            present = true
          }
        })
        return present;
      })
    } else {
      return state.ubications.ubications
    }
  }

  return(
    <View style={styles.container}>
      <UbicationModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        item={selected} 
        onPress={redirect}
      />
      { isLoadingPosition || state.ubications.isWaiting ? <ActivityIndicator/> : (
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={state.position.coords}
            provider={PROVIDER_GOOGLE}
            loadingEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            { filterubicationsSet().map((item) => (
              <View key={item.node.id}>
                <MapView.Marker
                  tracksViewChanges={true}
                  onPress={() => {
                    setSelected(item)
                    setModalVisible(!modalVisible);
                  }}
                  coordinate={{
                    latitude: item.node.latitud,
                    longitude: item.node.longitud
                  }}
                />
              </View>
            ))}
          </MapView>
          <Callout style={styles.buttonCallout}>
            <FAB
              icon="filter"
              onPress={toggleFiltersVisible}
              label='Filtrar'
              color='white'
              style={{ margin: 10}}
            />
          </Callout>
          <Callout style={{...styles.buttonCallout, alignSelf: 'flex-start'}}>
            <FAB
              icon="view-list"
              onPress={handleMapToggle}
              label='Ver lista'
              color='white'
              style={{ margin: 10}}
            />
          </Callout>
        </View>
      )}
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