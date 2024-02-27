import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function LocationItems({ items, handlePress, props }) {

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      style={styles.list}
      renderItem={({item}) => (
        <TouchableOpacity 
          key={ item.id }
          style={styles.item}
          onPress={() => handlePress(item, props)}  
        >
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name='map-marker' size={17} color={colors.primary}/>
            <Text style={styles.itemText} numberOfLines={1}>{ item.description }</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  item: {
    padding: 7,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  }
})