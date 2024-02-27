import { StyleSheet, Dimensions } from 'react-native';

export const headerStyles = {
  header: {
    width: Dimensions.get('screen').width / 2,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#222',
      letterSpacing: 1
  },
  headerLogo: {
      height: 40,
      width: 100,
  },
  icon: {
      position: 'absolute',
      left: 16
  },
}