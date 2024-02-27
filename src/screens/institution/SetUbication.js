import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import Constants from 'expo-constants';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../handlers/Queries';
import { FAB, Banner, Avatar, ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SetUbication({navigation}) {
  state = useSelector(state => state);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false)
  const [create, { createData }] = useMutation(queries.newSolicitudInstitucionWithUbication)
  const [add, {addData}] = useMutation(queries.addUbication);
  const action = navigation.getParam('action');
  const [showBanner, setShowBanner] = useState(true)

  const api_key = Constants.manifest.extra.googleApiKey;
  const query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(navigation.getParam('address')) + '&region=cl&key=' + api_key

  const confirmHandler = () => {
    setLoading(true);
    if( action == 'add') {
      add({ variables: {
        address: state.institution.data.address,
        region: state.institution.data.region,
        city: state.institution.data.city,
        latitude: state.institution.data.latitude,
        longitude: state.institution.data.longitude,
        professional: state.isLogin.professionalId,
        institution: state.institution.institutionData.id,
      }})
      .then((json) => {
        if("errors" in json) {
          alert('Falló la operación');
          setLoading(false)
        } else {
          setLoading(false)
          navigation.navigate('InstitutionHome')
        }
      })
    } else if (action == 'create'){
      create({ variables : {
        archivos: navigation.getParam('archivos'),
        name: state.institution.data.name,
        description: state.institution.data.description,
        address: state.institution.data.address,
        region: state.institution.data.region,
        city: state.institution.data.city,
        latitude: state.institution.data.latitude,
        longitude: state.institution.data.longitude,
        professional: state.isLogin.professionalId,
      }})
      .then((json) => {
        if("errors" in json) {
          alert('Registro Falló');
          setLoading(false)
        } else {
          setLoading(false)
          navigation.navigate('InstitutionHome')
        }
      })
    }
  }

  useEffect(() => { 
    if (action == 'add') {
      fetch(query)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ 
          type: 'SET_ADD_UBICATION_DATA', 
          payload: {
            address: navigation.getParam('address'),
            region: navigation.getParam('region'),
            city: navigation.getParam('city'),
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
          }
        })
      })
      .catch((error) => {
        {}
      });
      return () => {
        dispatch({type: 'LOADING_INSTITUTION_DATA'}, );
      }
    } else {
      fetch(query)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ 
          type: 'SET_CREATE_INSTITUTION_DATA', 
          payload: {
            name: navigation.getParam('name'),
            address: navigation.getParam('address'),
            description: navigation.getParam('description'),
            region: navigation.getParam('region'),
            city: navigation.getParam('city'),
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
          }
        })
      })
      .catch((error) => {
        {}
      });
      return () => {
        dispatch({type: 'LOADING_INSTITUTION_DATA'}, );
      }
    }
  }, []);

  if (state.institution.loading || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator/>
      </View>
    )
  } else {
    return(
      <View style={styles.container}>
        <Banner
          visible={showBanner}
          actions={[
            {
              label: 'Entendido',
              onPress: () => setShowBanner(false),
            },
          ]}
          icon={({size}) => (
            <Avatar.Icon size={size} icon="map-marker" />
          )}
        >Confirma si la ubicación es correcta. Puedes mover el marcador libremente manteniendolo presionado.
        </Banner>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: state.institution.data.latitude,
            longitude: state.institution.data.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker 
            draggable
            onDragEnd={(e) => {
              dispatch({ type: 'CHANGE_INSTITUTION_POS', payload: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              }})
            }}
            coordinate={{
              latitude: state.institution.data.latitude,
              longitude: state.institution.data.longitude
            }}
          />
        </MapView>
        <Callout style={styles.buttonCallout}>
          <TouchableOpacity onPress={confirmHandler} disabled={isLoading}>
            <FAB 
              label='Confirmar y crear'
              color='white'
              loading={isLoading}
            />
          </TouchableOpacity>
        </Callout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  buttonCallout: {
    flex: 1,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center'
  },
});