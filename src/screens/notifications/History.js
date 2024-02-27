import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { colors } from '../../../assets/styles/Colors';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../handlers/Queries';
import { Divider, ActivityIndicator, List} from 'react-native-paper';


export default function History({navigation}) {

  const [notificaciones, setNotificaciones] = useState([])
  
  state = useSelector(state => state);
  dispatch = useDispatch();

  var user_relate = ''
  var procesador = ''

  if(state.isLogin.isProfesional){
    var { data, loading, error } = useQuery(queries.getAllHandshakeProfesional(state.isLogin.professionalId), {pollInterval: 1000});
    user_relate = 'paciente'
    procesador = 'Profesional'
  } else {
    var { data, loading, error } = useQuery(queries.getAllHandshakePacient(state.isLogin.pacientId), {pollInterval: 1000});
    user_relate = 'profesional'
    procesador = 'Paciente'
  }

  useEffect(() => {
    const onCompleted = (data) => {
      setNotificaciones(data.allSolicitudHandshake.edges)
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
  
  return(
    <ScrollView contentContainerStyle={{ alignItems: 'center'}}>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Mi Historial</Text>
        <Divider/>
        <List.Section>
        {(loading) ? <ActivityIndicator/> :
          (<View>
            { notificaciones.length != 0 ? <View></View> : (
              <Text style={globalStyles.segmentText}>Nada por aquí</Text>
            )}
            {
              notificaciones.map((item) => {
                var name = item.node[user_relate].nombre + item.node[user_relate].apellido
                if(item.node.estado === 'A_1'){
                  if(item.node.usuarioSolicitante.id === state.isLogin.id){
                    
                    return(
                      <List.Item 
                        title={name}
                        description='aceptó tu solicitud de contacto'
                        key={item.node.id}
                        left={(props) => (<List.Icon {...props} color={colors.success} icon="check" />)}
                      />
                    )
                  } else {
                    return(
                      <List.Item 
                        title={name}
                        description='aceptaste la solicitud de contacto'
                        key={item.node.id}
                        left={(props) => (<List.Icon {...props} color={colors.success} icon="check" />)}
                      />
                    )
                  }
                } else if(item.node.estado === 'A_2'){
                  if(item.node.usuarioSolicitante.id !== state.isLogin.id){
                    if(item.node.procesadoPor && item.node.procesadoPor.id === state.isLogin.id){
                      return(
                        <List.Item 
                          title={name}
                          description='rechazaste la solicitud de contacto'
                          key={item.node.id}
                          left={(props) => (<List.Icon {...props} color={colors.danger} icon="close" />)}
                        />
                      )
                    }
                  } else {
                    if(item.node.procesadoPor && item.node.procesadoPor.id === state.isLogin.id){
                      return(
                        <List.Item 
                          title={name}
                          description='anulaste la solicitud de contacto'
                          key={item.node.id}
                          left={(props) => (<List.Icon {...props} color={colors.warning} icon="minus-circle" />)}
                        />
                      )
                    } else {
                      if(state.isLogin.isProfesional){
                        return(
                          <List.Item 
                            title={name}
                            description='rechazó tu solicitud de contacto'
                            key={item.node.id}
                            left={(props) => (<List.Icon {...props} color={colors.danger} icon="close" />)}
                          />
                        )
                      }
                    } 
                  }
                } else if(item.node.estado === 'A_0'){
                  if(item.node.usuarioSolicitante.id === state.isLogin.id){
                    return(
                      <List.Item 
                        title={name}
                        description='enviaste una solicitud de contacto'
                        key={item.node.id}
                        left={(props) => (<List.Icon {...props} color={colors.primary} icon="send" />)}
                      />
                    )
                  }
                }
              })
            }
          </View>
        )}
        </List.Section>
      </View>
    </ScrollView>
  )
}
