import { StyleSheet, Dimensions } from 'react-native';
import {colors} from './Colors';

export const profileStyles = {
  profileContainer: {
    alignItems: 'center',
    flex: 1
  },
  profileTopBackground: {
    backgroundColor: colors.secondary,
    width: '100%',
    position: 'absolute',
    height: Dimensions.get('window').height * 0.20,
    top: 0,
    zIndex: -1
  },
  profileImageContainer: {
    flexWrap: 'wrap',
    height: 140,
    width: 140,
    position: 'relative',
    top: -70,
    marginBottom: -50,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    alignSelf: 'center', 
  },
  profileImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 70,
  },
  profileContent: {
    backgroundColor: '#FFFFFF',
    marginTop: 140,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '95%',
    flex: 1,
    borderRadius: 7,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  }, 
}