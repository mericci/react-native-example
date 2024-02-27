import { colors } from './Colors';

export const loginModalStyles = {
  loginModalContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  loginFormContainer: {
    //flex: 1,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  loginImageContainer: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '60%',
  },
  loginImage: {
    flex: 1,
    resizeMode: 'contain',
    aspectRatio: 1.77,
  },
}