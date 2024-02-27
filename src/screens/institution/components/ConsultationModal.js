import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { useSelector } from 'react-redux';
import { Button, DataTable } from 'react-native-paper';
import { colors } from '../../../../assets/styles/Colors';

export default function ConsultationModal({ consultation, setShowModal, showModal, onDelete, setShowEdit }) {
  const state = useSelector(state => state);
  const [addAdmin, { addAdminData }] = useMutation(queries.addInstitutionAdmin);
  const tipoAtencion = { 'A_0': 'Presencial', 'A_1': 'Videoconferencia', 'A_2': 'Cualquiera' }

  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
    >
      { !showModal ? <Text></Text> : (
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.background}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={{textAlign: 'center', fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                { consultation.node.diaSemana.nombre }
              </Text>
            </View>
            <ScrollView style={{ flex: 1, width: '100%' }} >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Información</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>Previsión</DataTable.Cell>
                  <DataTable.Cell>{consultation.node.prevision.nombre}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Precio mínimo</DataTable.Cell>
                  <DataTable.Cell>${consultation.node.precioMinimo}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Precio máximo</DataTable.Cell>
                  <DataTable.Cell>${consultation.node.precioMaximo}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>¿Privada?</DataTable.Cell>
                  <DataTable.Cell>{consultation.node.privada ? 'Si' : 'No'}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Tipo de atención</DataTable.Cell>
                  <DataTable.Cell>{tipoAtencion[consultation.node.tipoAtencion]}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Horario de atención</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>Desde</DataTable.Cell>
                  <DataTable.Cell>{consultation.node.horaInicio.slice(0, -3)} hrs</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Hasta</DataTable.Cell>
                  <DataTable.Cell>{consultation.node.horaFin.slice(0, -3)} hrs</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Modalidades</DataTable.Title>
                </DataTable.Header>
                { consultation.node.modalidades.edges.map((modalidad) => (
                  <DataTable.Row key={modalidad.node.id}>
                    <DataTable.Cell>{ modalidad.node.nombre }</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>

            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 10}}>
              <Button
                color={colors.warning}
                mode='contained'
                onPress={() => {
                  setShowEdit(true);
                  setShowModal(false);
                }}
              >
                Editar
              </Button>
              <Button
                color={colors.danger}
                mode='contained'
                onPress={() => onDelete()}
              >
                Eliminar
              </Button>
            </View>
            <Button
              onPress={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          </View>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    height: '60%'
  },
  background: {
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});