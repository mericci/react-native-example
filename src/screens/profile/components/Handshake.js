import React, { useEffect, useState } from 'react';
import { View, } from 'react-native';
import { useQuery,useMutation } from '@apollo/react-hooks';

import { queries } from '../../../handlers/Queries';
import { useSelector, useDispatch } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import { colors } from '../../../../assets/styles/Colors';
import { Button, ActivityIndicator } from 'react-native-paper';

export default function Handshake({id, isProfessional, navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch(); 

  const [solicitudSend, setSolicitudSend] = useState(false)
  const [firstId, setFirstId] = useState(true);
  const [addContact, setAddContact] = useState(true)
  const [solictanteUser, setSolicitanteUser] = useState(true);
  const [showHandshake, setShowHandshake] = useState(isProfessional === state.isLogin.isProfesional)
  const [handshakeId, setHandshakeId] = useState('')
  const [validateHandshakeId, setValidateHandshakeId] = useState('')
  const [showIndicator, setShowIndicator] = useState(false) 

  if(state.isLogin.isProfesional){
    var { data, loading, error } = useQuery(queries.getAllHandshakePacientProfesional(id, state.isLogin.professionalId, Boolean(true)), {pollInterval: 1000});
  } else {
    var { data, loading, error } = useQuery(queries.getAllHandshakePacientProfesional(state.isLogin.pacientId, id,  Boolean(true)), {pollInterval: 1000});
  }
      
  const [handshake, { handshakeData }] = useMutation(queries.createSolicitudHandshake)
  const [acceptHandshake, { acceptHandshakeData }] = useMutation(queries.acceptSolicitudHandshake);
  const [rejectHandshake, { rejectHandshakeData }] = useMutation(queries.rejectSolicitudHandshake);
  const [endHandshake, { endHandshakeData }] = useMutation(queries.endHandshake)


  const handleHandshake = (pacientId, profesionalId, solicita) => { 
    handshake({ variables : {
      pacienteId: pacientId,
      profesionalId: profesionalId,
      solicitante: solicita
    }})
    .then((json) => {
      if("errors" in json) {
        alert('Solicitud Falló')
      } 
      else {
        setHandshakeId(json.data.createSolicitudNewHandshake.solicitud.id)
        setSolicitudSend(true)
        setSolicitanteUser(true)
        setShowIndicator(false)
      }
    })
  };

  const handleEndHandshake = (id) => { 
    endHandshake({ variables : {
      handshakeId: id
    }})
    .then((json) => {
      if("errors" in json) {
        alert('Solicitud Falló')
      } 
      else {
        setAddContact(true)
        setSolicitudSend(false)
        setShowIndicator(false)
      }
    })
  };

  const reviewValidateHandshake = () => {
    if(data.allHandshakes.edges.length){
      setAddContact(false)
    }
  }


  const reviewHandshake = () => {
    var exist = false;
    data.allSolicitudHandshake.edges.forEach(item => {
      if(item.node.estado === 'A_0'){
        setSolicitudSend(true)
        exist = true
        if(item.node.usuarioSolicitante.id !== state.isLogin.id){
          setSolicitanteUser(false)
        } else {
          setSolicitanteUser(true)
        }
      }
    });
    if(!exist){
      setSolicitudSend(false)
    }
      
  }

  const foundHandshake = () => {
    data.allSolicitudHandshake.edges.forEach(item => {
      if(item.node.estado === 'A_0'){
        setHandshakeId(item.node.id)
      }
    })
    data.allHandshakes.edges.forEach(element => {
        setValidateHandshakeId(element.node.id)
        setAddContact(false)
    })
  }

  const acceptSubmit = (id, user_type) => {
    acceptHandshake({ variables : {
        solicitudId: id,
        solicitante: user_type
      }})
      .then((json) => {
        if("errors" in json) {
          alert('Aprobación Falló');
        } else {
          setFirstId(true)
          //setAddContact(false)
          setSolicitudSend(true)
          setShowIndicator(false)
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
        }  else {
          setFirstId(true)
          setSolicitudSend(false)
          setShowIndicator(false)
        }
      })
    };
  

  useEffect(() => {
    const onCompleted = (data) => {
      if(firstId){
        reviewValidateHandshake()
        reviewHandshake()
        foundHandshake()
        setFirstId(false)
      }
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

  if(loading){
    return (
      <ActivityIndicator />
    )
  } else {
    return(
      <View style={{ marginVertical: 10 }}> 
        { state.isLogin.login &&
          (!showHandshake &&
            (
              addContact ?
              (
                !solicitudSend ?
                  (
                    state.isLogin.isProfesional ?
                      ( showIndicator ?
                        <ActivityIndicator />
                        :
                        <Button 
                          color={ colors.link }
                          onPress={() => {setShowIndicator(true), handleHandshake(id, state.isLogin.professionalId, state.isLogin.professionalId)}}
                        >Enviar Solicitud de Contacto</Button>
                      )
                          
                    :
                      ( showIndicator ?
                        <ActivityIndicator />
                        :
                        <Button 
                          color={ colors.link }
                          onPress={() => {setShowIndicator(true), handleHandshake(state.isLogin.pacientId, id, state.isLogin.pacientId)}}
                        >Enviar Solicitud de Contacto</Button>  
                      )
                        
                  )
                :
                  ( solictanteUser ?
                    ( showIndicator ?
                      <ActivityIndicator />
                      :
                      ( state.isLogin.isProfesional ?
                        <Button 
                          color={ colors.danger }
                          onPress={() => {setShowIndicator(true), rejectSubmit(handshakeId, 'Profesional')}}
                        >Anular Solicitud de Contacto</Button>
                        :
                        <Button
                          color={ colors.danger } 
                          onPress={() => {setShowIndicator(true), rejectSubmit(handshakeId, 'Paciente')}}
                        >Anular Solicitud de Contacto</Button>
                      )
                    )
                    :
                    ( showIndicator ?
                      <ActivityIndicator />
                      :
                      ( state.isLogin.isProfesional ?
                        <View>
                          <Button 
                            color={ colors.link }
                            style={{ marginBottom: 5 }}
                            onPress={() => {setShowIndicator(true), acceptSubmit(handshakeId, 'Profesional')}}
                          >Aceptar solicitud</Button>
                          <Button 
                            color={ colors.danger }
                            onPress={() => {setShowIndicator(true), rejectSubmit(handshakeId, 'Profesional')}}
                          >Rechazar solicitud</Button>
                        </View>
                        :
                        <View>
                          <Button 
                            color={ colors.link }
                            style={{ marginBottom: 5 }}
                            onPress={() => {setShowIndicator(true), acceptSubmit(handshakeId, 'Paciente')}}
                          >Aceptar solicitud</Button>
                          <Button 
                            color={ colors.danger }
                            onPress={() => {setShowIndicator(true), rejectSubmit(handshakeId, 'Paciente')}}
                          >Rechazar solicitud</Button>
                        </View>
                      )
                    )
                  )
              )
              :
              showIndicator ?
                <ActivityIndicator />
                :
                <Button 
                  color={ colors.danger }
                  onPress={() => {setShowIndicator(true), handleEndHandshake(validateHandshakeId)}}
                >Eliminar Contacto</Button>
            )
          )
        }
      </View>
    );
  }
}
