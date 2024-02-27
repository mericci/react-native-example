import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function RequestList({ items }) {
  const state = useSelector(state => state);
  const requestStates = {"A_0": "EN PROCESO", "A_1": "APROBADO", "A_2": "RECHAZADO"}
  const stateColor = {"A_0": colors.link, "A_1": colors.success, "A_2": colors.danger}
  
  if (items.length == 0) {
    return(
      <View style={{marginVertical: 10}}><Text>No hay solicitudes enviadas</Text></View>
    )
  } else {
    return(
      <View>
        { items.map((item) => {
          return(
            <View style={globalStyles.institutionItem} key={item.node.id}>
              <View style={globalStyles.institutionCard}>
                <MaterialCommunityIcons name="office-building" size={17} style={{marginRight: 5,}} color={colors.primary}/>
                <Text style={globalStyles.institutionTitle}>{item.node.institucion.nombre}</Text>
              </View>
              <View style={{...globalStyles.institutionButton, backgroundColor: stateColor[item.node.estado]}}>
                <Text style={{ color: 'white', fontWeight: '600'}}>{requestStates[item.node.estado]}</Text>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}