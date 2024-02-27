import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { Divider, Button } from 'react-native-paper';
import Requests from './components/Requests';
import Contacts from './components/Contacts';

export default function Notifications({navigation}) {
  state = useSelector(state => state);
  
  return(
    <ScrollView style={{flex: 1}} contentContainerStyle={{ alignItems: 'center' }}>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Solicitudes</Text>
        <Divider />
        <Requests />
        { state.isLogin.isProfesional ? 
          <Button onPress={() => {navigation.navigate('PacientsList')}}>Buscar usuario</Button> 
          : <View></View>
        }
        <Button onPress={() => {navigation.navigate('History')}}>Ver historial</Button>
      </View>

      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Mis contactos</Text>
        <Divider />
        <Contacts navigation={navigation}/>
      </View>
    </ScrollView>
  );
}
