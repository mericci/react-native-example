import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../assets/styles/Global';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { Divider, ActivityIndicator, Button } from 'react-native-paper';
import { queries } from '../../handlers/Queries';

import AdministeredList from './components/AdministeredList';
import JoinedItem from './components/JoinedItem';
import RequestList from './components/RequestList';
import Join from './Join';

export default function Index({navigation}) {
  const state = useSelector(state => state);
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const { error, loading, data } = useQuery(queries.getProfesionalProfileQuery(state.isLogin.id), {
    pollInterval: 1000
  })

  return(
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', marginTop: 10, }}>
      { loading ? <ActivityIndicator/> : 
        <Join 
        showModal={showModal}
        setShowModal={setShowModal}
        profile={data.user.profesional}
        navigation={navigation}
        requested={data.user.profesional.solicitudIntegrarInstitucionSet.edges.filter(
          (item) => (item.node.estado === "A_0")
        ).map((item) => (item.node.institucion.id))}
        />
      }
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Mis instituciones:</Text>
        <Divider style={{marginBottom: 5 }}/>
        { loading ? <ActivityIndicator/> : (
          <AdministeredList items={data.user.profesional.institucionesAdministradasSet.edges} navigation={navigation} />
        )}
        <Button onPress={() => navigation.navigate('CreateInstitution')} >Crear institución</Button>
      </View>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Instituciones a las que pertenezco:</Text>
        <Divider />
        { loading ? <ActivityIndicator/> : 
          data.user.profesional.institucionesSet.edges.lenght === 0 ? 
            <View style={{marginVertical: 10}}><Text>Actualmente no perteneces a ninguna institución</Text></View> : 
          data.user.profesional.institucionesSet.edges.map((item) => (
            <JoinedItem item={item} navigation={navigation} key={item.node.id}/>
          ))
        }
        <Button onPress={() => setShowModal(true)} >Unirse a una institución</Button>
      </View>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Solicitudes enviadas:</Text>
        <Divider />
        { loading ? <ActivityIndicator/> : (
          <RequestList items={data.user.profesional.solicitudIntegrarInstitucionSet.edges} />
        )}
      </View>
    </View>
    </ScrollView>
  );
}