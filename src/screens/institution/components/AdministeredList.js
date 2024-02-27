import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';
import { Button } from 'react-native-paper'

export default function AdministeredList({ items, navigation }) {
  const state = useSelector(state => state);

  const onPressInstitutionHandler = (node) => {
    //navigation.navigate('InstitutionJoinRequests', { institutionId: key, profesionalId: state.isLogin.profesionalId });
    navigation.navigate('ManageInstitution', { institution: node });
  }

  if (items.length == 0) {
    return(
      <View style={{marginVertical: 10}}><Text>Actualmente no administras ninguna institución</Text></View>
    )
  } else {
    return(
      <View>
        { items.map((item) => {
          return(
            <View style={globalStyles.institutionItem} key={item.node.id}>
              <View style={globalStyles.institutionCard}>
                <MaterialCommunityIcons name="office-building" size={17} style={{marginRight: 5,}} color={colors.primary}/>
                <Text style={globalStyles.institutionTitle}>{item.node.nombre}</Text>
              </View>
              <Button 
                color={colors.link} 
                mode='contained'
                onPress={() => onPressInstitutionHandler(item.node)}
              >Administrar</Button>
            </View>
          )
        })}
      </View>
    )
  }
}