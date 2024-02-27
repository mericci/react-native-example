import React, { useState } from 'react';
import { View, Text, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import { colors } from '../../../../assets/styles/Colors';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries'
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Edit({ institution, navigation }) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, { editData }] = useMutation(queries.editInstitution);
  const [deleteInstitution, { deleteInstitutionData }] = useMutation(queries.deleteInstitution);

  const reviewSchema = yup.object({
    description: yup.string().required('Debe ingresar descripción'),
  })

  onDeleteHandler = () => {
    deleteInstitution({ variables: {
      professional: state.isLogin.professionalId,
      institution: institution.id
    }})
    .then((json) => {
      Alert.alert("Éxito", "Insitución eliminada.", [
        { text: "OK", onPress: () => navigation.navigate('InstitutionHome') }
      ], { cancelable: false });
    })
  }

  const onSubmitHandler = (values) => {
    setLoading(true);
    edit({ variables : {
      description: values.description,
      professional: state.isLogin.professionalId,
      institution: institution.id,
    }})
    .then((json) => {
      if("errors" in json) {
        setLoading(false);
        Alert.alert("Error", "Fallo al editar, intente nuevamente.", [
          { text: "OK" }
        ], { cancelable: false });
      } else {
        setLoading(false);
        setShow(false);
        Alert.alert("Éxito!", "Institución editada.", [
          { text: "OK" }
        ], { cancelable: false });
      }
    })
  }

  if(loading) {
    return (<View><ActivityIndicator/></View>)
  } else {
    return(
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button
            color={colors.link}
            compact={true}
            onPress={() => {setShow(!show)}}
            icon={({size, color}) => (
              <MaterialCommunityIcons name='pencil' color={color} size={size} />
            )}
          >Editar info</Button>
          <Button
            color={colors.danger}
            compact={true}
            onPress={() => {Alert.alert("Eliminar institución", "¿Estás seguro que quieres eliminar esta institución?", [
              { text: 'Eliminar', onPress: () => onDeleteHandler() },
              { text: 'Cancelar', style: 'cancel'}
            ])}}
            icon={({size, color}) => (
              <MaterialCommunityIcons name='trash-can-outline' color={color} size={size} />
            )}
          >Eliminar</Button>
        </View>
        { !show ? <View></View> : (
          <Formik 
            initialValues={{ description: institution.descripcion }}
            onSubmit={(values) => onSubmitHandler(values)}
            validationSchema={reviewSchema}
          > 
            {(props) => (
              <View style={{ width: '100%', }}>
                <TextInput
                  label='Descripción'
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                  error={ props.touched.description && props.errors.description }
                  onBlur={props.handleBlur('description')}
                  style={{ marginTop: 8, }}
                  mode='outlined'
                  dense={true}
                  multiline={true}
                />
                { props.touched.description && props.errors.description ? 
                  <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text> : <View></View> 
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
                  <Button
                    color={colors.danger}
                    compact={true}
                    onPress={() => {setShow(false)}}
                    icon={({size, color}) => (
                      <MaterialCommunityIcons name='close' color={color} size={size} />
                    )}
                  >Cancelar</Button>
                  <Button
                    color={colors.link}
                    compact={true}
                    loading={loading}
                    onPress={props.handleSubmit}
                    icon={({size, color}) => (
                      <MaterialCommunityIcons name='check' color={color} size={size} />
                    )}
                  >Actualizar</Button>
                </View>
              </View>
            )}
          </Formik>
        )}
      </View>
    );
  }
}
