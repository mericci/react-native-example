import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { globalStyles } from '../../../assets/styles/Global';
import { queries } from '../../handlers/Queries';
import { ActivityIndicator, Divider, } from 'react-native-paper';
import MembersList from './components/MembersList';

export default function Institution({ props, navigation }) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const checkProfile = navigation.getParam('checkProfile')

  const { loading, data, error } = useQuery(queries.getInstitutionQuery(state.consultations.ubicationID));
  const [infoLoaded, setInfoLoaded] = useState(false)

  useEffect(() => {
    const onCompleted = (data) => {
      dispatch({ type: 'START_INSTITUTION_FETCH', payload: data })
      setInfoLoaded(true)
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

  if (loading || !infoLoaded) {
    return(
      <View style={{ flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View>
    )
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={globalStyles.profileContainer}>
          <View style={{ ...globalStyles.profileContent, marginTop: 15, paddingVertical: 10 }}>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Institución</Text>
            <Text style={globalStyles.institutionName}>{state.consultations.institutionData.nombre}</Text>
            <Text style={ styles.text }>{state.consultations.institutionData.descripcion}</Text>
            <View style={{ width: '100%', marginVertical: 5, }}>
              <Text style={ globalStyles.segmentTitle }>Sede:</Text>
              <Divider />
              <Text style={ styles.text }>{ state.consultations.ubicationData.direccion }</Text>
            </View>
            <View style={{ marginVertical: 10, }}></View>
            <View style={{ width: '100%', marginVertical: 5, }}>
              <Text style={ globalStyles.segmentTitle }>Profesionales:</Text>
              <Divider />
              <MembersList navigation={navigation} checkProfile={checkProfile} />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'justify',
  }
})