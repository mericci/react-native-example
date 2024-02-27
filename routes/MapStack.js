import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Search from '../src/screens/search/Search';
import ConsultationsList from '../src/screens/consultationsList/ConsultationsList';
import Header from '../src/screens/shared/Header';
import Consultation from '../src/screens/consultation/Consultation';
import Institution from '../src/screens/institution/Show';
import ProfesionalProfile from '../src/screens/profile/SearchProfile';
import { colors } from '../assets/styles/Colors'

const screens = {
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header navigation={navigation}/>,
          headerTitleAlign: 'center'
        }
      }
    },
    InstitutionProfile: {
      screen: Institution,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header navigation={navigation}/>,
          headerTitleAlign: 'center'
        }
      }
    },
    List: {
      screen: ConsultationsList,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header navigation={navigation}/>,
          headerTitleAlign: 'center'
        }
      }
    },
    Consultation: {
      screen: Consultation,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header navigation={navigation}/>,
          headerTitleAlign: 'center'
        }
      }
    },
    ProfesionalProfile: {
      screen: ProfesionalProfile,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header navigation={navigation}/>,
          headerTitleAlign: 'center'
        }
      }
    },
}  

const MapStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerStyle: { 
      backgroundColor: colors.primary,
    },
  },
});

export default MapStack;