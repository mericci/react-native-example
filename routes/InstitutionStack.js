import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Index from '../src/screens/institution/Index';
import CreateInstitution from '../src/screens/institution/Create';
import SetUbication from '../src/screens/institution/SetUbication';
import MyConsultations from '../src/screens/institution/MyConsultations';
import Manage from '../src/screens/institution/Manage';
import AddUbication from '../src/screens/institution/NewUbication';
import SetAddress from '../src/screens/institution/SetAddress';
import Header from '../src/screens/shared/Header';
import ProfesionalProfile from '../src/screens/profile/SearchProfile';
import { colors } from '../assets/styles/Colors';

const screens = {
  InstitutionHome: {
    screen: Index,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation}/>,
        headerTitleAlign: 'center'
      }
    }
  },
  MyConsultations: {
    screen: MyConsultations,
    navigationOptions: { title: 'Mis consultas' }
  },
  CreateInstitution: {
    screen: CreateInstitution,
    navigationOptions: { title: 'Crear institución' }
  },
  ManageInstitution: {
    screen: Manage,
    navigationOptions: { title: 'Administrar' }
  },
  AddUbication: {
    screen: AddUbication,
    navigationOptions: { title: 'Nueva sede' }
  },
  SetAddress: {
    screen: SetAddress,
    navigationOptions: { title: 'Dirección' }
  },
  SetUbication: {
    screen: SetUbication,
    navigationOptions: { title: 'Confirmar ubicación' }
  },
  ProfesionalProfile: {
    screen: ProfesionalProfile,
    navigationOptions: { title: 'Profesional' }
  },
}  

const InstitutionStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerStyle: { 
      backgroundColor: colors.primary,
    },
  },
});

export default InstitutionStack;