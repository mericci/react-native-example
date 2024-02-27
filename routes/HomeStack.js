import { createStackNavigator } from 'react-navigation-stack';
import { colors } from '../assets/styles/Colors'

import Home from '../src/screens/home/Home';
import ProfesionalRegister from '../src/screens/register/ProfesionalRegister';
import PacientRegister from '../src/screens/register/PacientRegister';


const screens = {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      }
    },
    ProfesionalRegister: {
      screen: ProfesionalRegister,
      navigationOptions: {
        headerShown: false,
      }
    },
    PacientRegister : {
      screen: PacientRegister,
      navigationOptions: {
        headerShown: false,
      }
    }
}  

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerStyle: { 
      backgroundColor: colors.primary,
    },
  },
});

export default HomeStack;