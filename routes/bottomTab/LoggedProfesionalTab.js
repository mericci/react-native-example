import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InstitutionStack from '../InstitutionStack';
import ProfileStack from '../ProfileStack';
import MapStack from '../MapStack';
import NotificationStack from '../NotificationStack';
import ChatStack from '../ChatStack'
import { colors } from '../../assets/styles/Colors';

const LoggedProfesionalTabs = createMaterialBottomTabNavigator({
  Institution: { 
    screen: InstitutionStack,
    navigationOptions: {
      tabBarLabel: 'Institución',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="office-building" size={25} style={{ color: tintColor }} />
      )
    } 
  },
  Chat: { 
    screen: ChatStack,
    navigationOptions: {
      tabBarLabel: 'Chat',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="chat" size={25} style={{ color: tintColor }} />
      )
    } 
  },
  Search: { 
    screen: MapStack,
    navigationOptions: {
      tabBarLabel: 'Buscar',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="map-search-outline" size={25} style={{ color: tintColor }} />
      )
    }  
  },
  Notifications: { 
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Contactos',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="contacts" size={25} style={{ color: tintColor }} />
      )
    }
  },
  Profile: { 
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Perfil',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="account" size={25} style={{ color: tintColor }} />
      )
    }  
  }
},{
  initialRouteName: 'Profile',
  activeColor: '#ffffff',
  inactiveColor: colors.secondary,
  barStyle: { backgroundColor: colors.primary },
  shifting: true
});

export default createAppContainer(LoggedProfesionalTabs);
