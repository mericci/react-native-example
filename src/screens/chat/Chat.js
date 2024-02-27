import React, {useState, useEffect} from 'react';
import { View, Text,  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../handlers/Queries';
import { List, ActivityIndicator, Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function Chat({navigation}) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  const [contactos, setContactos] = useState([])
  var user_relate = ''
  var procesador = ''

  if(state.isLogin.isProfesional){
    var { data, loading, error } = useQuery(queries.profesionalChats(state.isLogin.professionalId));
    user_relate = 'paciente'
    procesador = 'Profesional'
  } else {
    var { data, loading, error } = useQuery(queries.pacientChats(state.isLogin.pacientId));
    user_relate = 'profesional'
    procesador = 'Paciente'
  }

  useEffect(() => {
    const onCompleted = (data) => {
      setContactos(data.allHandshakes.edges)
    }
    const onError = (error) => {
      {}
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error){
        onCompleted(data)
      } else if (onError && !loading && error){
        onError(error)
      }
    }
  }, [loading, data, error]);


  if (loading) {
    return(<View><ActivityIndicator/></View>)
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
        <List.Section title='Mis conversaciones'>
          { contactos.length != 0 ? <View></View> : (
            <Text style={{...globalStyles.segmentText, textAlign: 'center'}}>Aún no tienes contactos</Text>
          )}
          {
            contactos.map((item) => {
              var name = item.node[user_relate].nombre + ' ' + item.node[user_relate].apellido;
              return(
                <View key={item.node.id} style={{...globalStyles.segment, marginVertical: 0, marginBottom: 5, padding: 0}}>
                  <List.Item 
                    title={name}
                    description={ item.node.chat.mensajes.edges.length != 0 ? item.node.chat.mensajes.edges[0].node.texto : ''}
                    left={props => item.node[user_relate].fotoPerfil && item.node[user_relate].fotoPerfil.nombre !== "{}" ? 
                      <Avatar.Image {...props} source={{uri: item.node[user_relate].fotoPerfil.url, height: 64, width: 64}}/> : 
                      <Avatar.Text {...props} color='white' label={item.node[user_relate].nombre.substring(0, 1) + item.node[user_relate].apellido.substring(0, 1) } />
                    }
                    onPress={() => navigation.navigate('Room', { chatId: item.node.chat.id})}
                  />
                </View>
              )
            })
          }
        </List.Section>
      </ScrollView>
    )
  }
}
