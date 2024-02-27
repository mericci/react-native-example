import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../HomeStack'
import MapStack from '../MapStack'
import { colors } from '../../assets/styles/Colors'

const defaultTabs = createMaterialBottomTabNavigator({
  Home: { 
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name="home" size={25} style={{ color: tintColor }} />
      ),
      barStyle: {
        backgroundColor: colors.secondary,
      },
      inactiveColor: colors.gray,
      tabBarVisible: false,
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
  }
},{
  initialRouteName: 'Home',
  activeColor: '#ffffff',
  inactiveColor: colors.secondary,
  barStyle: { backgroundColor: colors.primary },
  shifting: true
});

export default createAppContainer(defaultTabs);
