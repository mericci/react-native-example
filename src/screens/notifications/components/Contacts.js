import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { List, ActivityIndicator } from 'react-native-paper';
import Contact from './Contact';

export default function Contacts({ navigation }) {
  const [contactos, setContactos] = useState([])
  
  state = useSelector(state => state);
  dispatch = useDispatch();

  var user_relate = ''
  var procesador = ''

  if(state.isLogin.isProfesional){
    var { data, loading, error } = useQuery(queries.profesionalHandshakes(state.isLogin.professionalId), {pollInterval: 1000});
    user_relate = 'paciente'
    procesador = 'Profesional'
  } else {
    var { data, loading, error } = useQuery(queries.pacientHandshakes(state.isLogin.pacientId), {pollInterval: 1000});
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
      <List.Section>
        { contactos.length != 0 ? <View></View> : (
          <Text style={globalStyles.segmentText}>Aún no tienes contactos</Text>
        )}
        {
          contactos.map((item) => (
            <Contact 
              key={item.node.id}
              navigation={navigation} 
              item={item} 
              user_relate={user_relate}
            />
          ))
        }
      </List.Section>
    )
  }
}