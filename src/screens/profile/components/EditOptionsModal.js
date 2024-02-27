import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import MainButton from '../../shared/MainButton';
import { useSelector } from 'react-redux';

export default function RegisterTypeModal({showModal, setShowModal, navigation}) {

    const state = useSelector(state => state);

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
              <Text style={styles.title}>Configurar:</Text>
  
              <View style={styles.buttons}>
                <MainButton
                  title='Cambiar contraseña'
                  size='small'
                  color='primary'
                  onPress={() => {
                    setShowModal(!showModal);
                    navigation.navigate('ChangePasswordEdit');
                  }}
                />
                {
                    state.isLogin.isProfesional ?
                        <MainButton
                            title='Información de Profesional'
                            size='small'
                            color='primary'
                            onPress={() => {
                                setShowModal(!showModal);
                                navigation.navigate('ChangeProfesionalInfoEdit');
                            }}
                        />
                    :
                        <View></View>
                }
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