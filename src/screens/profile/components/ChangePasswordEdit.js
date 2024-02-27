import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global'
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { Formik } from 'formik';
import * as yup from 'yup';
import {OutlinedTextField} from 'react-native-material-textfield';
import { Button, Divider } from 'react-native-paper';
import { colors } from '../../../../assets/styles/Colors'; 

function validatePassword(ref, msg) {
    return yup.mixed().test({
      name: 'validatePassword',
      exclusive: false,
      message: msg || '',
      params: {
        reference: ref.path,
      },
      test: function(value) {
        var password2 = this.resolve(ref);
        if(value === password2){
            return true
        } else {
            return false;
        }
        
      },
    });
  }
  
  yup.addMethod(yup.mixed, 'validatePassword', validatePassword);

const ReviewSchema = yup.object({
    oldPassword: yup.string().required('Campo obligatorio'),
    newPassword1: yup.string().required('Campo obligatorio')
                              .min(8, 'Contraseña muy corta - debe tener mínimo 8 caracteres')
                              .matches(/(?=.*[0-9])/, 'Contraseña debe contener al menos un número'),
    newPassword2: yup.string().validatePassword(yup.ref('newPassword1'), 'Contraseña no coincide').required('Campo obligatorio'),
  })

export default function ChangePasswordEdit({navigation}) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  const [changePassword, { changePasswordData }] = useMutation(queries.changePassword)

  const handleSubmit = (values, setSubmitting) => { 
    changePassword({ variables : {
        oldPassword: values.oldPassword,
        newPassword1: values.newPassword1,    
        newPassword2: values.newPassword2,
    }})
    .then((json) => {
      if("errors" in json) {
        alert('Cambio de Contraseña Falló');
        setSubmitting(false)
      } else {
        if(json.data.passwordChange.success)
        {
          navigation.navigate('Profile');
        } else {
          alert('La contraseña ingresada no es correcta')
        }
        setSubmitting(false)
      }
    })
  };

  return(
    <ScrollView style={{ flex: 1 }}>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Cambio de contraseña</Text>
        <Divider style={{ marginBottom: 10 }}/>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword1: '',    
            newPassword2: '',
          }}
          validationSchema = {ReviewSchema}
          onSubmit={
            (values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }
          }
        >
          {(formikProps) => (
            <View>
              <OutlinedTextField 
                label='Contraseña Actual'
                onChangeText={formikProps.handleChange('oldPassword')}
                value={formikProps.values.oldPassword}
                error={formikProps.touched.oldPassword && formikProps.errors.oldPassword}
                onBlur={formikProps.handleBlur('oldPassword')}
                autoCorrect={false} 
                secureTextEntry={true}
              />

              <OutlinedTextField 
                label='Nueva Contraseña'
                onChangeText={formikProps.handleChange('newPassword1')}
                value={formikProps.values.newPassword1}
                error={formikProps.touched.newPassword1 && formikProps.errors.newPassword1}
                onBlur={formikProps.handleBlur('newPassword1')}
                autoCorrect={false} 
                secureTextEntry={true}
              />

              <OutlinedTextField 
                label='Nueva Contraseña'
                onChangeText={formikProps.handleChange('newPassword2')}
                value={formikProps.values.newPassword2}
                error={formikProps.touched.newPassword2 && formikProps.errors.newPassword2}
                onBlur={formikProps.handleBlur('newPassword2')}
                autoCorrect={false} 
                secureTextEntry={true}
              />
          
              <Button 
                color={ colors.link }
                mode='contained'
                icon='check'
                style={{ marginVertical: 5 }}
                onPress={formikProps.handleSubmit}
              >Cambiar Contraseña</Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
