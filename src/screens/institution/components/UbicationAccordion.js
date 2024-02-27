import React, {useState} from 'react';
import { View, Modal } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { useSelector } from 'react-redux';
import { List, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../../assets/styles/Colors';
import ConsultationItem from './ConsultationItem';
import CreateConsultationForm from '../../consultationsList/components/CreateConsultationForm';

export default function UbicationAccordion({ navigation, ubication }) {
  const state = useSelector(state => state);
  const [showFormModal, setShowFormModal] = useState(false);

  const { error: consultationsError, loading: consultationsLoading, data: consultationsData } = useQuery(
    queries.getProfesionalConsultationsList(state.isLogin.professionalId), {
    pollInterval: 1000
  })

  return(
    <View>
      <Modal
        animationType="fade"
        visible={showFormModal}
        transparent={true}
      >
        <CreateConsultationForm setShow={setShowFormModal} mode='create' ubicationId={ubication.node.id} />
      </Modal>

      <List.Accordion
        title={ubication.node.direccion}
        titleNumberOfLines={2}
        left={props => <List.Icon {...props} icon="map-marker" color={colors.primary} />}
        style={{ padding: 0 }}
        key={ubication.node.id}
      >
        <List.Item 
          title="Añadir consulta" 
          left={props => <List.Icon {...props} icon="plus" />}
          style={{ marginHorizontal: 20, backgroundColor: colors.gray, padding: 0, borderRadius: 5, marginVertical: 10  }}
          onPress={() => {setShowFormModal(true)}}
        />

        { consultationsLoading ? <ActivityIndicator /> : 
          consultationsData.profesional.consultasSet.edges.filter(
            (item) => (item.node.ubicacion.id === ubication.node.id)
          ).map((consultation) => (
            <ConsultationItem 
              key={consultation.node.id}
              consultation={consultation}
              navigation={navigation}
            />
          ))
        }
      </List.Accordion>
    </View>
  );
}