import React from 'react';
import { List } from 'react-native-paper';

export default function ListItem({ item, onPressHandler, showButton }) {

  const modalidaesToString = () => {
    const modalidadesNames = item.node.modalidades.edges.map(element => {
      return element.node.nombre;
    })
    return modalidadesNames.join(', ')
  }

  return (
    <List.Item 
      title={item.node.diaSemana.nombre + ' de ' + item.node.horaInicio.slice(0, -3) + ' a ' + item.node.horaFin.slice(0, -3)}
      description={ 'Más información' }
      titleNumberOfLines={2}
      onPress={() => onPressHandler(item.node.id, showButton)}
      left={props => <List.Icon {...props} icon="calendar" />}
    />
  );
}