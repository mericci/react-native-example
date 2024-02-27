import React, {useState} from 'react';
import { View, Modal, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { useSelector } from 'react-redux';
import { List } from 'react-native-paper';
import { colors } from '../../../../assets/styles/Colors';
import ConsultationModal from './ConsultationModal';
import CreateConsultationForm from '../../consultationsList/components/CreateConsultationForm';

export default function ConsultationItem({ navigation, consultation }) {
  const state = useSelector(state => state);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteConsultation, { deleteConsultationData }] = useMutation(queries.deleteConsultation)

  const onDeleteHandler = () => {
    Alert.alert("¿Estás seguro?", 
      'La consulta actual será eliminada', 
      [{ text: 'Aceptar', onPress: () => {
        setShowModal(false);
        deleteConsultation({ variables : {
          consultaId: consultation.node.id,
          profesional: state.isLogin.professionalId,
        }})
        .then((json) => {
          if("errors" in json) {
            Alert.alert("Error", json.errors.message, [
              { text: "OK" }
            ], { cancelable: false });
          } else {
            Alert.alert("Éxito!",
            'Consulta eliminada', [
              { text: "OK" }
            ], { cancelable: false });
          }
        })
      }},
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  return(
    <View>
      <ConsultationModal 
        showModal={showModal}
        setShowModal={setShowModal}
        consultation={consultation}
        onDelete={onDeleteHandler}
        setShowEdit={setShowEdit}
      />
      <Modal
        animationType="fade"
        visible={showEdit}
        transparent={true}
      >
        <CreateConsultationForm 
          setShow={setShowEdit} 
          mode='edit' 
          navigation={navigation} 
          ubicationId={consultation.node.ubicacion.id}
          consultation={consultation.node}
        />
      </Modal>
      <List.Item
        title={consultation.node.diaSemana.nombre}
        description={'De ' + consultation.node.horaInicio + ' a ' + consultation.node.horaFin}
        style={{marginHorizontal: 10}}
        left={props => <List.Icon {...props} style={{ marginHorizontal: 0 }} icon="clock-outline" color={colors.secondary} />}
        key={consultation.node.id}
        onPress={() => {
          setShowModal(true);
        }}
      />
    </View>
  );
}