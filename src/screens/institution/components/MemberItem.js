import React, {useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { useSelector } from 'react-redux';
import { Button, Menu } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';

export default function MemberItem({ item, isAdmin, institutionId, itsMe, navigation }) {
  const state = useSelector(state => state);
  const [addAdmin, { addAdminData }] = useMutation(queries.addInstitutionAdmin);
  const [unlinkMember, { unlinkMemberData }] = useMutation(queries.unlinkInstitutionMember);
  const [leaveAdmin, { leaveAdminData }] = useMutation(queries.leaveAdminInstitution);
  const [showMenu, setShowMenu] = useState(false);

  const makeAdminHandler = () => {
    setShowMenu(false)
    Alert.alert("¿Estás seguro?", 
      item.node.nombre + ' ' + item.node.apellido + ' se convertirá en en administrador de esta institución', 
      [{ text: 'Aceptar', onPress: () => addAdmin({
        variables: {
          professional: item.node.id, 
          institution: institutionId
        }}
      )
      .then((json) => {
        if("errors" in json) {
          Alert.alert("Error", json.errors.message, [
            { text: "OK" }
          ], { cancelable: false });
        } else {
          Alert.alert("Éxito!",
          item.node.nombre + ' ' + item.node.apellido + ' ahora es administrador', [
            { text: "OK" }
          ], { cancelable: false });
        }
      })
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  const unlinkHandler = () => {
    setShowMenu(false)
    Alert.alert("¿Estás seguro?", 
      item.node.nombre + ' ' + item.node.apellido + ' será desvinculado de esta institución', 
      [{ text: 'Aceptar', onPress: () => unlinkMember({
        variables: {
          professional: item.node.id, 
          institution: institutionId,
          admin: state.isLogin.professionalId
        }}
      )
      .then((json) => {
        if("errors" in json) {
          Alert.alert("Error", json.errors.message, [
            { text: "OK" }
          ], { cancelable: false });
        } else {
          Alert.alert("Éxito!",
          item.node.nombre + ' ' + item.node.apellido + ' fue desvinculado', [
            { text: "OK" }
          ], { cancelable: false });
        }
      })
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  const leaveAdminHandler = () => {
    setShowMenu(false)
    Alert.alert("¿Estás seguro?", 
      'Dejarás de ser administrador de esta institución', 
      [{ text: 'Aceptar', onPress: () => leaveAdmin({
        variables: {
          professional: state.isLogin.professionalId, 
          institution: institutionId,
        }}
      )
      .then((json) => {
        if("errors" in json) {
          Alert.alert("Error", json.errors.message, [
            { text: "OK" }
          ], { cancelable: false });
        } else {
          navigation.navigate('InstitutionHome');
        }
      })
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  const handleViewProfessional = () => {
    setShowMenu(false);
    navigation.navigate('ProfesionalProfile', {id: item.node.id, isProfessional: true})
  }

  return(
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 5 }}>
      <MaterialCommunityIcons name='account' color={colors.link} size={17} />
      <View style={{ flex: 1, marginLeft: 5}}>
      <Text style={{ fontSize: 15 }}>{ item.node.nombre + ' ' + item.node.apellido }</Text>
      { isAdmin ? <Text style={{ fontSize: 12, }}>Administrador</Text> : <View></View> }
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
        { isAdmin ? 
          <View>
            { itsMe ? 
              <Menu.Item onPress={() => {leaveAdminHandler()}} title="Dejar de ser administrador" /> 
              : 
              <Menu.Item onPress={() => {handleViewProfessional()}} title="Ver más" />
            }
          </View> 
          : (
          <View>
            <Menu.Item onPress={() => {handleViewProfessional()}} title="Ver más" />
            <Menu.Item onPress={() => {makeAdminHandler()}} title="Hacer administrador" />
            <Menu.Item onPress={() => {unlinkHandler()}} title="Desvincular" />
          </View>
        )}
      </Menu>
    </View>
  );
}