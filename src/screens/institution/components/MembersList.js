import React from 'react';
import { View, Text, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { queries } from '../../../handlers/Queries';
import { ActivityIndicator, List, Avatar } from 'react-native-paper';

const { useEffect } = React;

export default function MembersList({ props, navigation, checkProfile }) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  const onPressProfesionalHandler = (item) => {
    navigation.navigate('List', { profesionalId: item.id, checkProfile: checkProfile, fotoPerfil: item.fotoPerfil })
  }

  const { loading, data, error } = useQuery(queries.getMembersList(state.consultations.ubicationID), {pollInterval: 1000});

  useEffect(() => {
    const onCompleted = (data) => {
      dispatch({ type: 'START_MEMBERS_FETCH', payload: data.ubicacion.institucion.miembros.edges })
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
  }, [loading, data, error])

  const filterMembers = () => {
    if (state.search.searchResults) {
      return state.consultations.membersData.filter(member => {
        var present = false
        state.search.searchResults.profesionales.forEach(profesional => {
          if (profesional.id === member.node.id) {
            present = true
          }
        })
        return present;
      })
    } else {
      return state.consultations.membersData
    }
  }

  const especialidadesToString = (item) => {
    const modalidadesNames = item.node.especialidadesSet.edges.map(element => {
      return element.node.nombre;
    })
    return modalidadesNames.join(', ')
  }

  if (loading || !state.consultations.membersData) {
    return(
      <View><ActivityIndicator /></View>
    )
  } else if (state.consultations.membersData.length === 0) {
    return(<View><Text>No hay profesionales disponibles</Text></View>)
  } else {
    return(
      <List.Section>
        { filterMembers().map((item) => (
          <List.Item 
            key={item.node.id}
            title={item.node.nombre + ' ' + item.node.apellido}
            description={'Especialidades: ' + especialidadesToString(item)}
            style={{ paddingHorizontal: 0}}
            onPress={() => onPressProfesionalHandler(item.node)} 
            left={props => item.node.fotoPerfil && item.node.fotoPerfil.nombre !== "{}" ? 
              <Avatar.Image source={{uri: item.node.fotoPerfil.url, height: 64, width: 64}}/> : 
              <Avatar.Text label={item.node.nombre.substring(0, 1) + item.node.apellido.substring(0, 1) } />
            }
          />
        ))}
      </List.Section>
    )
  }
}