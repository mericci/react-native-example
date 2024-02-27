import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';

export default function QuestionCount(props) {
  return (
    <View style={globalStyles.searchModalHeader}>
      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold'}}>
        Busqueda asistida
      </Text>
      <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold'}}>
        Pregunta {props.counter} de {props.total}
      </Text>
    </View>
  );
}