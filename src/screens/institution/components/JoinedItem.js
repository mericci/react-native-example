import React, {useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../assets/styles/Colors';
import { Menu, Button } from 'react-native-paper';
import { queries } from '../../../handlers/Queries';

export default function JoinedItem({ item, navigation }) {
  const state = useSelector(state => state);
  const [showMenu, setShowMenu] = useState(false)
  const [leaveInstitution, { leaveInstitutionData }] = useMutation(queries.leaveInstitution);

  const leaveInstitutionHandler = (id) => {
    setShowMenu(false)
    Alert.alert("¿Estás seguro?", 
      'Serás desvinculado de esta institución', 
      [{ text: 'Aceptar', onPress: () => leaveInstitution({
        variables: {
          professional: state.isLogin.professionalId, 
          institution: id,
        }}
      )
      .then((json) => {
        if("errors" in json) {
          Alert.alert("Error", json.errors.message, [
            { text: "OK" }
          ], { cancelable: false });
        } else {
          Alert.alert("Éxito!",
          'Has sido desvinculado', [
            { text: "OK" }
          ], { cancelable: false });
        }
      })
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  return(
    <View style={globalStyles.institutionItem} key={item.node.id}>
      <View style={globalStyles.institutionCard}>
        <MaterialCommunityIcons name="office-building" size={17} style={{marginRight: 5,}} color={colors.primary}/>
        <Text style={globalStyles.institutionTitle}>{item.node.nombre}</Text>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Button
              color={colors.link}
              compact={true}
              mode='contained'
              onPress={() => setShowMenu(true)}
              icon={({size, color}) => (
                <MaterialCommunityIcons name='dots-vertical' color={color} size={size} />
              )}
            >Más</Button>
          }
        >
          <View>
            <Menu.Item 
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('MyConsultations', {institution: item})
              }} 
              title="Mis consultas" 
            />
            <Menu.Item onPress={() => {leaveInstitutionHandler(item.node.id)}} title="Abandonar institución" />
          </View>
        </Menu>
      </View>
    </View>
  )
}