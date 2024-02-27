import { StyleSheet } from 'react-native';
import { colors} from './Colors';

export const formStyles = {
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 7,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 0.5,
    width: '100%'
  },
  titleInput: {
    fontSize: 18,
    marginTop:5
  },
  modalForm: {
    flex: 1,
    marginHorizontal: 10
  },
  obligatoryField:{
    color: 'crimson',
  },
  picker: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 13, 
    paddingHorizontal: 4,
    paddingTop:4, 
    color: colors.danger,
  }
}