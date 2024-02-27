import React from 'react';
import { StyleSheet ,View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import { globalStyles } from '../../../../assets/styles/Global';

export default function Institutions({institutions, onPressHandler}) {
  const state = useSelector(state => state);

  return(
    <View style={{ width: '100%', marginVertical: 5, }}>
      <Text style={styles.title}>Instituciones:</Text>
      <Divider/>
      {(institutions.map((item) => {
          return(
            <TouchableOpacity style={globalStyles.smallCard} 
              onPress={() => onPressHandler(item.node.ubicacionSet.edges[0].node.id)} 
              key={item.node.id}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5, marginTop: 7 }}>
                {item.node.nombre}
              </Text>
            </TouchableOpacity>
            )}))
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
