import { StyleSheet } from 'react-native';
import { colors} from './Colors';

export const generalStyles = {
  container: {
    flex: 1,
    padding: 20
  },
  titleText: {
    fontSize: 18,
    color: '#222'
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.primary,
  },
  homeImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
  },
  homeImage: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1.77,
  },
  segmentTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  segment: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '95%',
    marginVertical: 10,
    borderRadius: 7,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',
  },
  segmentText: {
    fontSize: 15,
    marginVertical: 5,
  },
  smallCard: {
    backgroundColor: 'white',
    borderLeftWidth: 5,
    borderColor: colors.secondary,
    borderRadius: 4,
    marginTop: 7,
    paddingHorizontal: 7,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 1.5,
  }
}