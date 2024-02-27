import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../assets/styles/Global';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { Divider, ActivityIndicator, Button } from 'react-native-paper';
import { queries } from '../../handlers/Queries';
import { colors } from '../../../assets/styles/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InstitutionJoinRequest from './components/InstitutionJoinRequest';
import MemberItem from './components/MemberItem';
import UbicationItem from './components/UbicationItem';
import Edit from './components/Edit';

export default function Index({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const institution = navigation.getParam('institution');
  const { error: institutionError, loading: institutionLoading, data: institutionData } = useQuery(queries.getAllInstitutionInfo(institution.id), {
    pollInterval: 1000
  })
  const { error: requestsError, loading: requestsLoading, data: requestsData} = useQuery(queries.getRequestsJoinInstitution(institution.id), {
    pollInterval: 1000
  })

  const isAdmin = (id) => {
    var result = false;
    institutionData.institucion.administradores.edges.forEach(item => {
      if(item.node.id === id) {
        result = true;
      }
    });
    return result;
  }

  useEffect(() => {
    dispatch({ 
      type: 'SET_INSTITUTION_DATA', 
      payload: institution
    })
  }, [])

  return(
    <ScrollView style={{ flex: 1, }}>
    <View style={{ flex: 1, alignItems: 'center', marginTop: 10, }}>
      { institutionLoading ? <View></View> : (
        <View style={globalStyles.segment}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{ institutionData.institucion.nombre }</Text>
          <Text style={globalStyles.segmentTitle}>Descripción</Text>
          <Divider />
          <Text style={globalStyles.segmentText}>{ institutionData.institucion.descripcion }</Text>
          <Edit institution={institutionData.institucion} navigation={navigation} />
        </View>
      )}
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Sedes</Text>
        <Divider />
        { institutionLoading ? <ActivityIndicator /> : (
          <View>
            { institutionData.institucion.ubicacionSet.edges.map((item) => (
              <UbicationItem item={item} key={item.node.id} />
            ))}
          </View>
        )}
        <Button
          color={colors.link}
          compact={true}
          onPress={() => navigation.navigate('AddUbication', { action: 'add'})}
          icon={({size, color}) => (
            <MaterialCommunityIcons name='plus' color={color} size={size} />
          )}
        >Agregar sede</Button>
      </View>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Miembros</Text>
        <Divider />
        { institutionLoading ? <ActivityIndicator /> : (
          <View>
            { institutionData.institucion.miembros.edges.filter(
                (item) => (item.node.id === state.isLogin.professionalId)
              ).map((item) => (
                <MemberItem 
                  item={item} 
                  key={item.node.id}
                  isAdmin={true}
                  institutionId = {institutionData.institucion.id}
                  itsMe={true}
                  navigation={navigation}
                />
              ))
            }
            <Divider style={{ marginVertical: 4 }} />
            { institutionData.institucion.miembros.edges.filter(
                (item) => (item.node.id != state.isLogin.professionalId)
              ).map((item) => {
              var admin = isAdmin(item.node.id);
              return (<MemberItem 
                item={item} 
                key={item.node.id}
                isAdmin={admin}
                institutionId = {institutionData.institucion.id}
                itsMe={false}
                navigation={navigation}
              />)
            })}
        </View>
        )}
      </View>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Solicitudes</Text>
        <Divider />
        { requestsLoading ? <ActivityIndicator /> : (
          <View>
            { requestsData.allSolicitudJoinInstitucion.edges.filter(
                (item) => (item.node.estado === "A_0")
              ).map((item) => (
              <InstitutionJoinRequest navigation={navigation} item={item} key={item.node.id}/>
            ))}
            { requestsData.allSolicitudJoinInstitucion.edges.filter(
                (item) => (item.node.estado === "A_0")
              ).length > 0 ? <Divider style={{ marginVertical: 4 }} /> : <View></View> }
            { requestsData.allSolicitudJoinInstitucion.edges.filter(
                (item) => (item.node.estado != "A_0")
              ).map((item) => (
              <InstitutionJoinRequest navigation={navigation} item={item} key={item.node.id}/>
            ))}
          </View>
        )}
      </View>
    </View>
    </ScrollView>
  );
}