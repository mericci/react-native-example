import React from 'react';
import { View, StyleSheet, Modal, Text, Image, TouchableWithoutFeedback } from 'react-native';
import MainButton from '../../shared/MainButton';
import { globalStyles } from '../../../../assets/styles/Global';

export default function InfoModal({showModal, setShowModal}) {
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
              <View style={globalStyles.homeImageContainer}>
                <Image style={{...globalStyles.homeImage, aspectRatio: 3.44 }} source={require('../../../../assets/images/psiconecta.png')}/>
              </View>
              <Text style={{margin: 20, textAlign: 'center', fontSize: 15}}>
                Mapsy es una aplicación desarrollada por Psiconecta. Esta busca conectar a cualquier persona con los mejores profesionales de la salud mental.
              </Text>
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
    background: {
      backgroundColor: 'black',
      opacity: 0.4,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -1,
    }
  });