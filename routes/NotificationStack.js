import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Notifications from '../src/screens/notifications/Notifications'
import PacientsList from '../src/screens/notifications/PacientsList'
import SearchProfile from '../src/screens/profile/SearchProfile';
import History from '../src/screens/notifications/History';
import Header from '../src/screens/shared/Header';
import { colors } from '../assets/styles/Colors'

const screens = {
  Notifications: {
    screen: Notifications,
    navigationOptions: { title: 'Mis contactos' }
  },
  PacientsList: {
    screen: PacientsList,
    navigationOptions: { title: 'Usuarios' }
  },
  PacientProfile: {
    screen: SearchProfile,
    navigationOptions: { title: 'Usuario' }
  },
  History: {
    screen: History,
    navigationOptions: { title: 'Mi historial' }
  },
}  

const NotificationStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerStyle: { 
      backgroundColor: colors.primary,
    },
  },
});

export default NotificationStack;