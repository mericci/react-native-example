import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { colors } from '../assets/styles/Colors'
import Profile from '../src/screens/profile/Profile';
import Header from '../src/screens/shared/Header';
import ChangePasswordEdit from '../src/screens/profile/components/ChangePasswordEdit';
import ChangeProfesionalInfoEdit from '../src/screens/profile/components/ChangeProfesionalInfoEdit';


const screens = {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => <Header navigation={navigation}/>,
          headerTitleAlign: 'center'
        }
      }
    },
    ChangePasswordEdit: {
      screen: ChangePasswordEdit,
      navigationOptions: { title: 'Cambiar contraseña' }
    },
    ChangeProfesionalInfoEdit: {
      screen: ChangeProfesionalInfoEdit,
      navigationOptions: { title: 'Editar perfil' }
    },
}  

const ProfileStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerStyle: { 
      backgroundColor: colors.primary,
    },
  },
});

export default ProfileStack;