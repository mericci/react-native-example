import React, {useState} from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { NavigationActions } from 'react-navigation';
import { Divider, List, Avatar, Menu } from 'react-native-paper';

export default function Contacts({navigation, item, user_relate}) {  
  state = useSelector(state => state);
  dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = item.node[user_relate];
  const name = user.nombre + ' ' + user.apellido;

  const [endHandshake, { endHandshakeData }] = useMutation(queries.endHandshake)

  const handleEndHandshake = () => { 
    Alert.alert("Atención!", 
      '¿Estás seguro que quieres eliminar a ' + name + ' de tus contactos?', 
      [{ text: 'Aceptar', onPress: () => 
        endHandshake({ variables : {
          handshakeId: item.node.id
        }})
        .then((json) => {
          if("errors" in json) {
            alert('Solicitud Falló')
          }
        })
        .then((json) => {
          if("errors" in json) {
            Alert.alert("Error", json.errors.message, [
              { text: "OK" }
            ], { cancelable: false });
          } else {
            Alert.alert("Éxito!", 'Eliminado con éxito.', [
              { text: "OK" }
            ], { cancelable: false });
          }
        })
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  };

  return (
    <List.Item 
      key={item.node.id}
      title={name}
      onPress={() => setShowMenu(true)}
      left={props => user.fotoPerfil && user.fotoPerfil.nombre !== "{}" ? 
        <Avatar.Image source={{uri: user.fotoPerfil.url, height: 64, width: 64}}/> : 
        <Avatar.Text label={user.nombre.substring(0, 1) + user.apellido.substring(0, 1) } />
      }
      right={props =>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={<List.Icon {...props} style={{ alignSelf: 'center', marginHorizontal: 0, }} icon="dots-vertical" />
          }
        >
          <Menu.Item 
            onPress={() => {
              setShowMenu(false);
              navigation.navigate(
                'Room',
                { chatId: item.node.chat.id},
                NavigationActions.navigate({ routeName: 'Chat' })
              )}
            } 
            title="Enviar mensaje" 
          />
          <Divider />
          <Menu.Item 
            onPress={() => {
              setShowMenu(false);
              handleEndHandshake()
            }} 
            title="Eliminar contacto" 
          />
        </Menu> 
      }
    />
  )
}