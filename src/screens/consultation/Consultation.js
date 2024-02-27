import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../handlers/Queries';
import { DataTable, Drawer, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/Colors';
import CreateConsultationForm from '../consultationsList/components/CreateConsultationForm';

export default function Consultation({ navigation }) {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(navigation.getParam('show'))
  const tipoAtencion = { 'A_0': 'Presencial', 'A_1': 'Videoconferencia', 'A_2': 'Cualquiera' }
  
  state = useSelector(state => state);
  dispatch = useDispatch();

  const { error: consultationError, loading: consultationLoading, data: consultationData } = useQuery(
    queries.getConsultationQuery(navigation.getParam('id')), 
    {pollInterval: 1000}
  );
  const [deleteConsultation, { deleteConsultationData }] = useMutation(queries.deleteConsultation)

  const onDelete = () => {
    deleteConsultation({ variables : {
      consultaId: navigation.getParam('id'),
      profesional: state.isLogin.professionalId,
    }})
    .then((json) => {
      if("errors" in json) {
        alert('Creación Falló');
      } else {
        navigation.navigate('List')
      }
    })
  }

  if (consultationLoading) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Modal
            animationType="fade"
            visible={show}
            transparent={true}
          >
            <CreateConsultationForm 
              setShow={setShow} 
              mode='edit' 
              navigation={navigation} 
              ubicationId={consultationData.consulta.ubicacion.id} 
              consultation={consultationData.consulta}
            />
          </Modal>
          <View style={globalStyles.segment}>
              <View style={{ alignItems: 'center', marginTop: 15}}>
                <Text style={{fontSize: 20, fontWeight: '500',}}>
                  {consultationData.consulta.profesional.nombre + ' '}
                  {consultationData.consulta.profesional.apellido}
                </Text>
                <Text>{consultationData.consulta.ubicacion.institucion.nombre}</Text>
              </View>
              { showButton ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                  <Button 
                    compact
                    icon='pencil'
                    color={ colors.warning }
                    onPress={()=>{setShow(true)}}
                  >Editar</Button>
                  <Button 
                    compact
                    icon='close'
                    color={ colors.danger }
                    onPress={()=>{onDelete()}}
                  >Eliminar</Button>
                </View>
                :
                <View></View>
              }
              <View style={{ marginVertical: 10 }}></View>
              <View style={{ width: '100%' }}>
                <Drawer.Item
                  style={{ backgroundColor: colors.gray, marginTop: 10 }}
                  icon="information-outline"
                  label="Información"
                />
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>Previsión</DataTable.Cell>
                    <DataTable.Cell>{consultationData.consulta.prevision.nombre}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Precio mínimo</DataTable.Cell>
                    <DataTable.Cell>${consultationData.consulta.precioMinimo}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Precio máximo</DataTable.Cell>
                    <DataTable.Cell>${consultationData.consulta.precioMaximo}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>¿Privada?</DataTable.Cell>
                    <DataTable.Cell>{consultationData.consulta.privada ? 'Si' : 'No'}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Tipo de atención</DataTable.Cell>
                    <DataTable.Cell>{tipoAtencion[consultationData.consulta.tipoAtencion]}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>

                <Drawer.Item
                  style={{ backgroundColor: colors.gray, marginTop: 15 }}
                  icon="clock-outline"
                  label="Horario de atención"
                />
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>Desde</DataTable.Cell>
                    <DataTable.Cell>{consultationData.consulta.horaInicio.slice(0, -3)} hrs</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Hasta</DataTable.Cell>
                    <DataTable.Cell>{consultationData.consulta.horaFin.slice(0, -3)} hrs</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>

                <Drawer.Item
                  style={{ backgroundColor: colors.gray, marginTop: 15 }}
                  icon="star"
                  label="Modalidades"
                />
                <DataTable>
                  { consultationData.consulta.modalidades.edges.map((modalidad) => (
                    <DataTable.Row key={modalidad.node.id}>
                      <DataTable.Cell>{ modalidad.node.nombre }</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>

                <Drawer.Item
                  style={{ backgroundColor: colors.gray, marginTop: 15}}
                  icon="brain"
                  label="Especialidades"
                />
                <DataTable>
                  { consultationData.consulta.profesional.especialidadesSet.edges.map((item) => (
                    <DataTable.Row key={item.node.id}>
                      <DataTable.Cell>{ item.node.nombre }</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
                
              </View>
            </View>
        </View>
      </ScrollView>
    )
  }
}

