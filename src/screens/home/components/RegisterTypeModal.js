import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import MainButton from '../../shared/MainButton';

export default function RegisterTypeModal({showModal, setShowModal, navigation}) {
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        { !showModal ? <Text>No data</Text> : (
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.title}>Registrarse como:</Text>
  
              <View style={styles.buttons}>
                <MainButton
                  title='Profesional'
                  size='small'
                  icon='account-outline'
                  color='primary'
                  onPress={() => {
                    setShowModal(!showModal);
                    navigation.navigate('ProfesionalRegister');
                  }}
                />
                
                <MainButton
                  title='Usuario'
                  size='small'
                  icon='account-outline'
                  color='primary'
                  onPress={() => {
                    setShowModal(!showModal);
                    navigation.navigate('PacientRegister');
                  }}
                />
              </View>
              <MainButton
                size='small'
                title='Volver'
                onPress={() => {setShowModal(!showModal)}}
              />
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
      borderRadius: 15,
      paddingVertical: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: '80%'
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
    },
    buttons: {
      marginVertical: 20,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    },
    background: {
      backgroundColor: 'black',
      opacity: 0.4,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -1,
    }
  });