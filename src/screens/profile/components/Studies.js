import React from 'react';
import { StyleSheet ,View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function Studies({studies, personal}) {
  const state = useSelector(state => state);

  var grados = {
    'LIC': 'Licenciado',
    'PRO': 'Profesional',
    'TEC': 'Técnico',
    'DIP': 'Diplomado',
    'MAG': 'Magister',
    'DOC': 'Doctorado'
  }
  
  return(
    <View style={{ width: '100%', marginVertical: 5, }}>
      <Text style={styles.title}>Estudios:</Text>
      <Divider/>
      {
        personal ? 
          (state.profile.studies.map((item) => {
            return(
              <View key={item.node.id} style={styles.item}>
                <MaterialCommunityIcons name="school" size={20} color={colors.primary}/>
                <View style={{ marginLeft: 10, }}>
                  <Text style={ styles.subtitle }>{item.node.universidad.nombre}</Text>
                  <Text>{ grados[item.node.grado] }</Text>
                  <Text>{ item.node.descripcion }</Text>
                </View>
              </View>
            )
          }))
      :
          (studies.map((item) => {
            return(
              <View key={item.node.id} style={styles.item}>
                <MaterialCommunityIcons name="school" size={20} color={colors.primary}/>
                <View style={{ marginLeft: 10, }}>
                  <Text style={ styles.subtitle }>{item.node.universidad.nombre}</Text>
                  <Text>{ grados[item.node.grado] }</Text>
                  <Text>{ item.node.descripcion }</Text>
                </View>
              </View>
            )
          }))
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  item: { 
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
