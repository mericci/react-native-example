import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { useSelector } from 'react-redux';
import { Button, Menu } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function InstitutionJoinRequest({navigation, item }) {
  const state = useSelector(state => state);
  const [acceptRequest, { acceptData }] = useMutation(queries.acceptJoinRequest)
  const [rejectRequest, { rejectData }] = useMutation(queries.rejectJoinRequest)
  const [showMenu, setShowMenu] = useState(false)
  const recieved = new Date(item.node.fechaRecepcion)
  const requestStates = {"A_0": "EN PROCESO", "A_1": "APROBADO", "A_2": "RECHAZADO"}
  const stateColor = {"A_0": colors.warning, "A_1": colors.success, "A_2": colors.danger}

  const handleAccept = () => {
    setShowMenu(false)
    acceptRequest({ variables: { requestId: item.node.id , userId: state.isLogin.professionalId } })
      .then(response => {
        {}
      });
  }

  const handleReject = () => {
    setShowMenu(false)
    rejectRequest({ variables: { requestId: item.node.id, userId: state.isLogin.professionalId } })
      .then(response => {
        {}
      });
  }

  const handleViewProfessional = () => {
    setShowMenu(false)
    navigation.navigate('ProfesionalProfile', {id: item.node.profesional.id, isProfessional: true})
  }

  return(
    <View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginVertical: 3 }} key={item.node.id}>
      <MaterialCommunityIcons name='account' color={colors.link} size={20} />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text style={{ flex: 1, fontSize: 16 }}>
          { item.node.profesional.nombre + ' ' + item.node.profesional.apellido }
        </Text>
        <Text style={{color: 'grey', fontSize: 12, }}>Recibida: { recieved.toLocaleString() }</Text>
        <Text style={{color: stateColor[item.node.estado], fontSize: 12, }}>Estado: { requestStates[item.node.estado] }</Text>
      </View>
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <Button
            color={colors.link}
            compact={true}
            onPress={() => setShowMenu(true)}
            icon={({size, color}) => (
              <MaterialCommunityIcons name='dots-vertical' color={color} size={size} />
            )}
          >Más</Button>
        }
      >
        { item.node.estado != "A_0" ? <Menu.Item onPress={() => {handleViewProfessional()}} title="Ver más" /> : (
          <View>
            <Menu.Item onPress={() => {handleViewProfessional()}} title="Ver más" />
            <Menu.Item onPress={() => {handleAccept()}} title="Aceptar" />
            <Menu.Item onPress={() => {handleReject()}} title="Rechazar" />
          </View>
        )}
      </Menu>
    </View>
    </View>
  );
}