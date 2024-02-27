import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Chat from '../src/screens/chat/Chat';
import Room from '../src/screens/chat/components/Room';
import Header from '../src/screens/shared/Header';
import { colors } from '../assets/styles/Colors'

const screens = {
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation}/>,
        headerTitleAlign: 'center'
      }
    }
  },
  Room: {
    screen: Room,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation}/>,
        headerTitleAlign: 'center'
      }
    }
  }
}  

const ChatStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerStyle: { 
      backgroundColor: colors.primary,
    },
  },
});

export default ChatStack;