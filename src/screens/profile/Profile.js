import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import * as SecureStore from 'expo-secure-store';

import { queries } from '../../handlers/Queries';
import { useSelector, useDispatch } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { colors } from '../../../assets/styles/Colors';
import { Button } from 'react-native-paper';

import BasicInfo from './components/BasicInfo';
import Studies from './components/Studies';
import Specialties from './components/Specialties';
import EditOptionsModal from './components/EditOptionsModal';

export default function Profile({navigation}) {
    const [showEditModal, setShowEditModal] = useState(false)
  
    const state = useSelector(state => state);
    const dispatch = useDispatch(); 

    if(state.isLogin.isProfesional){
      var query = queries.getProfesionalProfileQuery(state.isLogin.id);
    } else {
      var query = queries.getPacientProfileQuery(state.isLogin.id);
    }

    const { loading, data, error } = useQuery(query);

    const setToken = async() => {
      await SecureStore.setItemAsync('access_token', '').then(response =>
        {}
      )  
    }

    function HandleLogOut() {
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'RESET_PROFILE_INFO' })
      setToken()
    }

    useEffect(() => {
      const onCompleted = (data) => {
        if(state.isLogin.isProfesional){
          if(data.user.profesional === null){
            dispatch({ type: 'GET_PROFILE_INFO', payload: {
              id: '',
              email: data.user.email,
              name: '',
              lastname: '',
              studies: [],
              specialties: [],
              fechaNacimiento: '',
              genero: '',
              photo: {},
              valido: false,
              tipoProfesional: []
            }})
          } else {
            dispatch({ type: 'GET_PROFILE_INFO', payload: {
              id: data.user.profesional.id,
              email: data.user.email,
              name: data.user.profesional.nombre,
              lastname: data.user.profesional.apellido,
              studies: data.user.profesional.estudiosSet.edges,
              specialties: data.user.profesional.especialidadesSet.edges,
              fechaNacimiento: data.user.profesional.fechaNacimiento,
              genero: data.user.profesional.sexo,
              photo: data.user.profesional.fotoPerfil,
              valido: data.user.profesional.valido,
              tipoProfesional: data.user.profesional.tipoProfesionalSet.edges,
            }})
          }
        } else {
          if(data.user.paciente === null){
            dispatch({ type: 'GET_PROFILE_INFO', payload: {
              id: '',
              email: data.user.email,
              name: '',
              lastname: '',
              fechaNacimiento: '',
              genero: '',
              photo: {}
            }})
          } else {
            dispatch({ type: 'GET_PROFILE_INFO', payload: {
              id: data.user.paciente.id,
              email: data.user.email,
              name: data.user.paciente.nombre,
              lastname: data.user.paciente.apellido,
              fechaNacimiento: data.user.paciente.fechaNacimiento,
              genero: data.user.paciente.genero,
              photo: data.user.paciente.fotoPerfil
            }})
          }
        }
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

    return(
      <ScrollView style={{ flex: 1 }}>
        <EditOptionsModal 
          navigation={navigation}
          showModal={showEditModal} 
          setShowModal={setShowEditModal} 
        />
        { loading ? <ActivityIndicator/> : 
        ( 
          <View style={globalStyles.profileContainer}>
            <View style={globalStyles.profileTopBackground}></View>
            <View style={globalStyles.profileContent}>
              <View style={globalStyles.profileImageContainer}>
                {
                  state.profile.photo && state.profile.photo.nombre !== "{}" ?
                    <Image style={globalStyles.profileImage} source={{uri: state.profile.photo.url, height: 140, width: 140}}/> 
                  :
                    <Image style={globalStyles.profileImage} source={require('../../../assets/images/user.png')}/> 
                }
              </View>

              <BasicInfo personal={true}/>

              { state.isLogin.isProfesional &&
                <View style={{ width: '100%' }}>
                  <Studies personal={true}/>
                  <Specialties personal={true}/>
                </View>
              }

              <View style={{ flexDirection: 'row', marginVertical: 10, alignSelf: 'center' }}>
                <Button 
                  icon='pencil'
                  color={ colors.link }
                  onPress={() => {setShowEditModal(true)}}
                >Editar perfil</Button>
                <Button 
                  icon='logout'
                  color={ colors.danger }
                  onPress={HandleLogOut}
                >Cerrar sesión</Button>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
  );
}
