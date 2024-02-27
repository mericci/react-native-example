import React, { useEffect, useState } from 'react';
import { StyleSheet ,View, ScrollView, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useQuery,useMutation } from '@apollo/react-hooks';

import { queries } from '../../handlers/Queries';
import { useSelector, useDispatch } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { colors } from '../../../assets/styles/Colors';
import { Button, ActivityIndicator } from 'react-native-paper';

import BasicInfo from './components/BasicInfo';
import Studies from './components/Studies';
import Specialties from './components/Specialties';
import Institutions from './components/Institutions';
import Handshake from './components/Handshake';

export default function SearchProfile({navigation}) {
    const state = useSelector(state => state);
    const dispatch = useDispatch(); 
    const id = navigation.getParam('id');
    const isProfessional = navigation.getParam('isProfessional');

    if (isProfessional) {
      var { error, loading, data } = useQuery(queries.getProfesional(id))
    } else {
      var { error, loading, data } = useQuery(queries.getPacient(id))
    }

    const onPressHandler = (key) => {
      dispatch({ type: 'SET_UBICATION_ID', payload: key });
      navigation.navigate('InstitutionProfile', { checkProfile: false });
    }    

    return (
      <ScrollView style={{flex: 1}}>
        { loading ? <ActivityIndicator /> : 
          <View style={globalStyles.profileContainer}>
            <View style={globalStyles.profileTopBackground}></View>
            <View style={globalStyles.profileContent}>
              <View style={globalStyles.profileImageContainer}>
                {
                  isProfessional && data.profesional.fotoPerfil && data.profesional.fotoPerfil.nombre !== "{}" ?
                    <Image style={globalStyles.profileImage} source={{uri: data.profesional.fotoPerfil.url, height: 140, width: 140}}/> 
                  :
                  !isProfessional && data.paciente.fotoPerfil && data.paciente.fotoPerfil.nombre !== "{}" ?
                    <Image style={globalStyles.profileImage} source={{uri: data.paciente.fotoPerfil.url, height: 140, width: 140}}/> 
                  :
                    <Image style={globalStyles.profileImage} source={require('../../../assets/images/user.png')}/> 
                }
              </View>
              <BasicInfo data={ isProfessional ? data.profesional : data.paciente} personal={false} isProfessional={isProfessional}/>

              { state.isLogin.login && (
                <Handshake id={ isProfessional ? data.profesional.id : data.paciente.id} isProfessional={isProfessional}/>
              )}
              
              { isProfessional &&
                  (<View style={{ width: '100%' }}>
                    <Studies studies={data.profesional.estudiosSet.edges} personal={false}/>
                    <Specialties specialties={data.profesional.especialidadesSet.edges} personal={false}/>
                    <Institutions institutions={data.profesional.institucionesSet.edges} onPressHandler={onPressHandler}/>
                  </View>)
              }
            </View>
          </View>
        }
      </ScrollView>
    );
}
