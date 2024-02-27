import React, {useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { useSelector } from 'react-redux';
import { Button, Menu } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function UbicationItem({ item }) {
  const state = useSelector(state => state);
  const [deleteUbication, { deleteUbicationData }] = useMutation(queries.deleteUbication)
  const [showMenu, setShowMenu] = useState(false)

  const deleteHanlder = () => {
    setShowMenu(false)
    Alert.alert("Atención!", 
      '¿Estás seguro que quieres eliminar la sede de ' + item.node.direccion + '? Se eliminarán también las consultas asociadas.', 
      [{ text: 'Aceptar', onPress: () => deleteUbication({
        variables: {
          professional: state.isLogin.professionalId, 
          ubication: item.node.id,
        }}
      )
      .then((json) => {
        if("errors" in json) {
          Alert.alert("Error", json.errors.message, [
            { text: "OK" }
          ], { cancelable: false });
        } else {
          Alert.alert("Éxito!", 'Sede eliminada con éxito.', [
            { text: "OK" }
          ], { cancelable: false });
        }
      })
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  return(
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 7}}>
        <MaterialCommunityIcons name='map-marker' color={colors.link} size={17} />
        <Text style={{ flex: 1, fontSize: 15, marginLeft: 5 }}>{ item.node.direccion }</Text>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Button
              color={colors.link}
              compact={true}
              onPress={() => setShowMenu(true)}
              icon={({size, color}) => (
                <MaterialCommunityIcons name='dots-vertical' color={color} size={size} />
              )}
            >Más</Button>
          }
        >
          <View>
            <Menu.Item onPress={() => {deleteHanlder()}} title="Eliminar" />
          </View>
        </Menu>
      </View>
    </View>
  );
}