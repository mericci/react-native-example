import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import { colors } from '../../../../assets/styles/Colors';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { ActivityIndicator, List, IconButton } from 'react-native-paper';

export default function History() {
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

  function checkStatus(item) {
    return item.node.usuarioSolicitante.id !== state.isLogin.id && item.node.estado === 'A_0';
  }

  const [acceptHandshake, { acceptHandshakeData }] = useMutation(queries.acceptSolicitudHandshake);
  const [rejectHandshake, { rejectHandshakeData }] = useMutation(queries.rejectSolicitudHandshake);

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

  const acceptSubmit = (id, user_type) => {
    acceptHandshake({ variables : {
        solicitudId: id,
        solicitante: user_type
      }})
      .then((json) => {
        if("errors" in json) {
          alert('Aprobación Falló');
        } else {
          setNotificaciones(data.allSolicitudHandshake.edges)
        }
      })
    };

    const rejectSubmit = (id, user_type) => {
      rejectHandshake({ variables : {
          solicitudId: id,
          solicitante: user_type
        }})
        .then((json) => {
          if("errors" in json) {
            alert('Rechazo Falló');
          } else {
            setNotificaciones(data.allSolicitudHandshake.edges)
          }
        })
      };

  if (loading) {
    return(<View><ActivityIndicator/></View>)
  } else {
    return(
      <View>
        { notificaciones.filter(checkStatus).length != 0 ? <View></View> : (
          <Text style={globalStyles.segmentText}>No has recibido solicitudes</Text>
        )}
        <List.Section>
          {notificaciones.map((item) => {
            if(item.node.usuarioSolicitante.id !== state.isLogin.id && item.node.estado === 'A_0'){
              var name = item.node[user_relate].nombre + ' ' + item.node[user_relate].apellido
              return(
                <View>
                  <List.Item 
                    key={item.node.id}
                    title={name}
                    description='te ha enviado una solicitud de contacto'
                    left={(props) => (<List.Icon {...props} style={{marginHorizontal: -2}} color={colors.primary} icon="account-outline" />)}
                    right={(props) => (
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <IconButton
                          icon="check"
                          color={colors.success}
                          size={20}
                          onPress={() => {acceptSubmit(item.node.id, procesador)}}
                        />
                        <IconButton
                          icon="close"
                          color={colors.danger}
                          size={20}
                          onPress={() => {rejectSubmit(item.node.id, procesador)}}
                        />
                      </View>
                    )}
                  />
                </View>
              )
            }
          })}
        </List.Section>
      </View>
    )
  }
}