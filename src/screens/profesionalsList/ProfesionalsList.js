import React, {useEffect, useState} from 'react';
import { ScrollView, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { queries } from '../../handlers/Queries';
import Professionals from './components/Professionals'

export default function ProfesionalsList({ navigation, handleMapToggle, toggleFiltersVisible }) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  const [dispatchReady, setDispatchReady] = useState(false)

  if (state.search.searchResults) {
    if (state.search.searchResults.consultas.length === 0){
      alert("No se obtuvieron resultados")
    }
  }

  const onPressProfesionalHandler = (item) => {
    navigation.navigate('ProfesionalProfile', {id: item.id, isProfessional: true})
  }

  const { loading, data, error } = useQuery(queries.getAllProfesionals);

  useEffect(() => {
    const onCompleted = (data) => {
      dispatch({ type: 'GET_PROFESIONALS', payload: data.allProfesionales.edges })
      setDispatchReady(true)
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


  return (
    (loading || !dispatchReady) ? <ActivityIndicator /> : (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1, }}>        
          <Professionals 
            onPressHandler={onPressProfesionalHandler}
            handleMapToggle={handleMapToggle}
            toggleFiltersVisible={toggleFiltersVisible}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  )
}