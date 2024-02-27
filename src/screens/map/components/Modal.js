import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import { colors} from '../../../../assets/styles/Colors';

export default function UbicationModal({modalVisible, setModalVisible, item, onPress}) {
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      { !modalVisible ? <Text>No data</Text> : (
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.background}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={styles.title}>{ item.node.institucion.nombre}</Text>
            <Text style={styles.modalText}>{ item.node.direccion}</Text>

            <View style={styles.buttons}>
              <Button
                color={colors.link}
                mode='contained'
                compact
                style={{ flex: 1, marginRight: 10 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onPress(item.node.id)
                }}
              >Ver más</Button>
              <Button
                color={colors.danger}
                mode='contained'
                compact
                style={{ flex: 1 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >Cerrar</Button>
            </View>
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  },
  buttons: {
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  background: {
    backgroundColor: 'black',
    opacity: 0.2,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});