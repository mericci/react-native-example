import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function Specialties({specialties, personal}) {
  const state = useSelector(state => state);

  return(
    <View style={{ width: '100%', marginVertical: 5, }}>
      <Text style={styles.title}>Especialidades:</Text>
      <Divider/>
      {
        personal ? 
          (state.profile.specialties.map((item) => {
            return(
              <View key={item.node.id} style={styles.item}>
                <MaterialCommunityIcons name="brain" size={15} color={colors.primary}/>
                <View style={{ marginLeft: 10, }}>
                  <Text style={ styles.subtitle }>{item.node.nombre}</Text>
                </View>
              </View>
            )
          }))
      :
          (specialties.map((item) => {
            return(
              <View key={item.node.id} style={styles.item}>
                <MaterialCommunityIcons name="brain" size={15} color={colors.primary}/>
                <View style={{ marginLeft: 10, }}>
                  <Text style={ styles.subtitle }>{item.node.nombre}</Text>
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
