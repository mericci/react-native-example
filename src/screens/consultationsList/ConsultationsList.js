import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { queries } from '../../handlers/Queries';
import Consultations from './components/Consultations'

const { useEffect } = React;

export default function ConsultationsList({ navigation }) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const checkProfile = navigation.getParam('checkProfile')
  const profesionalId = navigation.getParam("profesionalId");

  const onPressConsultationHandler = (key, showButton) => {
    navigation.navigate('Consultation', { id: key, show: showButton })
  }

  const onPressProfileHandler = () => {
    navigation.navigate('ProfesionalProfile', {id: profesionalId, isProfessional: true})
  }

  const { loading, data, error } = useQuery(queries.getProfesionalConsultationsList(navigation.getParam("profesionalId")), {pollInterval: 1000});

  useEffect(() => {
    const onCompleted = (data) => {
      dispatch({ type: 'START_CONSULTATIONS_FETCH', payload: data })
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

  useEffect(() => {
    return() => {
      dispatch({ type: 'RESET_CONSULTATIONS' })
    }
  }, []);

  return (
    state.consultations.data ? <Consultations 
                                navigation={navigation}
                                onPressHandler={onPressConsultationHandler} 
                                onPressProfileHandler={onPressProfileHandler}
                                checkProfile={checkProfile} /> : 
                              <ActivityIndicator />
  )
}