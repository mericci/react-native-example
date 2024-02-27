import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import  {OutlinedTextField } from 'react-native-material-textfield';
import RNPickerSelect from 'react-native-picker-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Button } from 'react-native-paper';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { colors } from '../../../../assets/styles/Colors';

var sex_props = [
    {label: 'Cualquiera', value: 'Cualquiera'},
    {label: 'Mujer', value: 'Mujer' },
    {label: 'Hombre', value: 'Hombre' }
  ];

var appointmentTypeProps = [
  {label: 'Cualquiera', value: 'Cualquiera'},
  {label: 'Presencial', value: 'Presencial'},
  {label: 'Videoconferencia', value: 'Videoconferencia'}  
]

var orderByProps = [
  {label: 'Precio menor a mayor', value: 'price_low_to_high'},
  {label: 'Precio mayor a menor', value: 'price_high_to_low'},
  {label: 'Especialidad', value: 'priority'},
  {label: 'Psiquiatras primero', value: 'psychiatrist'}
]

export default function RegisterForm({ setFiltersVisible, toggleGuidedSearch, map }) {
    const [pathologies, setPathologies] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [profesionalType, setProfesionalType] = useState([])
    const [modalities, setModalities] = useState([])
    const [searching, setSearching] = useState(false)
    const [margin, setMargin] = useState(0)

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const { loading, data, error } = useQuery(queries.getAdvancedSearchInfo);
    const [advancedSearch, { searchData }] = useMutation(queries.advancedSearch);

    useEffect(() => {
        const onCompleted = (data) => {
          dispatch({ type: 'GET_DATA_SEARCH', 
          payload: {
            regions: data.allRegiones.edges,
            pathologies: data.allPatologias.edges,
            profesionalTypes: data.allTiposProfesionales.edges,
            modalities: data.allModalidades.edges,
            previsions: data.allPrevisiones.edges,
          }})
        }
        const onError = (error) => {
          {}
        }
        if (onCompleted || onError) {
          if (onCompleted && !loading && !error){
            onCompleted(data)
          } else if (onError && !loading && error){
            onError(error)
          }
        }
    }, [loading, data, error])

    useEffect(()=>{
      if(map){
        setMargin(0)
      } else {
        setMargin(-37)
      }
    })

    const regionsDisplay = () => {
      var children = state.search.regions.map(item => {
        return { 'name': item.node.nombre, 'id': item.node.id }
      });
      return [{ 'name': 'Regiones', 'children': children }]
    }

    const citiesDisplay = () => {
      var children = []
      state.search.regions.forEach(item => {
        regions.forEach(selected => {
          if (item.node.id === selected) {
            item.node.ciudadSet.edges.forEach(ciudad => {
              children.push({ 'name': ciudad.node.nombre, 'id': ciudad.node.id })
            })
          }
        })
      });
      return [{ 'name': 'Ciudades', 'children': children }]
    }

    const pathologiesDisplay = () => {
      const addedPathologies = []
      var children = state.search.pathologies.map(item => {
        if (state.isLogin.isProfesional) {
          if (!addedPathologies.includes(item.node.descripcionProfesionales)){
            addedPathologies.push(item.node.descripcionProfesionales)
            return { 'name': item.node.descripcionProfesionales, 'id': item.node.id }
          } else {
            return { 'name': null, 'id': item.node.id}
          }
        } else {
          return { 'name': item.node.descripcionPacientes, 'id': item.node.id }
        }
      }).filter(pathology => pathology.name);
      return [{ 'name': 'Patologias', 'children': children }]
    }
    
    const profesionalTypesDisplay = () => {
      var children = state.search.profesionalTypes.map(item => {
        return { 'name': item.node.nombre, 'id': item.node.id }
      });
      return [{ 'name': 'Tipos Profesional', 'children': children }]
    }

    const modalitiesDisplay = () => {
      var children = state.search.modalities.map(item => {
        return { 'name': item.node.nombre, 'id': item.node.id }
      });
      return [{ 'name': 'Modalidades', 'children': children }]
    }

    const previsionsDisplay = () => {
      var children = state.search.previsions.map(item => {
        return { label: item.node.nombre, value: item.node.id }
      });
      return children
    }

    const dataToArray = (array) => {
      var input = [];
      for(var i = 0; i < array.length; i++){
          input.push('"' + array[i] + '"')
        }
      return input;
  };

    const handleSubmit = (values, setSubmitting) => { //se puede agregar atributo action que sea create o edit, para definir el editar con el mismo form
      setSearching(true)  
      advancedSearch({ variables: {
          orderBy: values.orderBy,
          pathologies: dataToArray(values.pathologies),
          regions: dataToArray(values.regions),
          cities: dataToArray(values.cities),
          ageRange: values.age,
          professionalType: dataToArray(values.profesionalType),
          atentionType: values.appointmentType,
          modalities: dataToArray(values.modalities),
          maxPrice: values.maxPrice,
          minPrice: values.minPrice,
          socialWelfare: values.prevision,
          gender: values.gender
        }})
        .then((json) => {
          if("errors" in json) {
            alert('Búsqueda Falló');
            setSubmitting(false)
            setSearching(false)
          } else if (json.data.advancedSearch.consultas.length == 0) {
            Alert.alert("Error", "No se obtuvieron resultados", [
              { text: "OK", onPress: () => {} }
            ], { cancelable: false });
            setSubmitting(false)
            setSearching(false)
          } else {
            dispatch({ type: 'SET_SEARCH_RESULT', payload: json.data.advancedSearch })
            setSubmitting(false)
            setSearching(false)
            setFiltersVisible()
          }
        })
    };

    if(loading || searching){
        return (<ActivityIndicator/>)
    } else {
    return (
      <View style={{ flex: 1, }}>
        <Formik
            initialValues={{
              orderBy: 'nothing',
              pathologies: [],
              regions: [],
              cities: [],
              age: '-1',
              profesionalType: [],
              appointmentType: 'Cualquiera',
              modalities: [],
              maxPrice: '-1',
              minPrice: '-1',
              prevision: 'UHJldmlzaW9uTm9kZTo0',
              gender: 'Cualquiera'
            }}
            onSubmit={
              (values, { setSubmitting }) => {
                handleSubmit(values, setSubmitting);
              }
            }
        >
          {(formikProps) => (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', width: '100%', marginVertical: 10, justifyContent: 'space-evenly', paddingHorizontal: 10}}>
                <Button 
                  onPress={formikProps.handleSubmit} 
                  mode='contained' 
                  color={colors.link}
                  style={{ flex: 1, marginRight: 10 }}
                >Aplicar</Button>
                <Button 
                  onPress={setFiltersVisible} 
                  mode='contained' 
                  color={colors.danger}
                  style={{ flex: 1 }}
                >Cerrar</Button>
              </View>

              <ScrollView style={{ flex: 1}} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}>
              <View>
                {
                  !map &&
                    <View>
                        <OutlinedTextField 
                        label='Ordenar por'
                        onChangeText={formikProps.handleChange('orderBy')}
                        error={formikProps.touched.orderBy && formikProps.errors.orderBy}
                        value=' '
                        editable={false}
                      />
                      <View style={{ position: 'relative', bottom:58}}>
                        <RNPickerSelect
                          style={{...pickerSelectStyles}}
                          items={ orderByProps }
                          placeholder={{label: 'Ordenar por'}}
                          onValueChange={(value) => {
                            if (value) {
                                formikProps.values.orderBy = value
                            } else {
                                formikProps.values.orderBy = ''
                            }
                          }}
                        />
                      </View>
                    </View>
                }
              </View>
              <View style={{marginTop: margin, marginBottom:-52}}>
                <OutlinedTextField 
                  label='Patología(s)'
                  error={formikProps.touched.pathologies && formikProps.errors.pathologies}
                  value=' '
                  editable={false}
                />
                <View style={{position: 'relative', bottom:67}}>
                  <SectionedMultiSelect 
                    items={pathologiesDisplay()}
                    uniqueKey="id"
                    subKey="children"
                    selectText="¿Para qué problema(s) buscas ayuda?"
                    confirmText='Confirmar'
                    searchPlaceholderText='Buscar'
                    selectedText='seleccionados'
                    modalWithSafeAreaView={true}
                    showDropDowns={false}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={setPathologies}
                    selectedItems={pathologies, formikProps.values.pathologies = pathologies}
                  />
                </View>
              </View>

              <View >
                <OutlinedTextField 
                  label='Región(es)'
                  error={formikProps.touched.regions && formikProps.errors.regions}
                  value=' '
                  editable={false}
                />
                <View style={{position: 'relative', bottom:67}}>
                  <SectionedMultiSelect 
                    items={regionsDisplay()}
                    uniqueKey="id"
                    subKey="children"
                    selectText="¿En qué región buscas?"
                    confirmText='Confirmar'
                    searchPlaceholderText='Buscar'
                    selectedText='seleccionados'
                    modalWithSafeAreaView={true}
                    showDropDowns={false}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={setRegions}
                    selectedItems={regions, formikProps.values.regions = regions}
                  />
                </View>
              </View>

              <View style={{marginVertical: -52}}>
                <OutlinedTextField 
                  label='Ciudad/comuna'
                  error={formikProps.touched.cities && formikProps.errors.cities}
                  value=' '
                  editable={false}
                />
                <View style={{position: 'relative', bottom:67}}>
                  <SectionedMultiSelect 
                    items={citiesDisplay()}
                    uniqueKey="id"
                    subKey="children"
                    selectText="¿En qué ciudad/comuna buscas?"
                    confirmText='Confirmar'
                    searchPlaceholderText='Buscar'
                    selectedText='seleccionados'
                    modalWithSafeAreaView={true}
                    showDropDowns={false}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={setCities}
                    selectedItems={cities, formikProps.values.cities = cities}
                  />
                </View>
              </View>

              <View style={{marginBottom: 70}}>
                <OutlinedTextField 
                  label='Ingresa tu edad'
                  onChangeText={formikProps.handleChange('age')}
                  value={formikProps.values.age > 0 ? formikProps.values.age : ''}
                  error={formikProps.touched.age && formikProps.errors.age}
                  autoCorrect={false}
                  keyboardType='number-pad'
                />
              </View>

              <View style={{marginVertical: -52}}>
                <OutlinedTextField 
                  label='Tipo(s) Profesional'
                  error={formikProps.touched.profesionalType && formikProps.errors.profesionalType}
                  value=' '
                  editable={false}
                />
                <View style={{position: 'relative', bottom:67}}>
                  <SectionedMultiSelect 
                    items={profesionalTypesDisplay()}
                    uniqueKey="id"
                    subKey="children"
                    selectText="¿Qué tipo de profesional buscas?"
                    confirmText='Confirmar'
                    searchPlaceholderText='Buscar'
                    selectedText='seleccionados'
                    modalWithSafeAreaView={true}
                    showDropDowns={false}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={setProfesionalType}
                    selectedItems={profesionalType, formikProps.values.profesionalType = profesionalType}
                  />
                </View>
              </View>

              <View>
                <OutlinedTextField 
                  label='Tipo atención'
                  onChangeText={formikProps.handleChange('appointmentType')}
                  error={formikProps.touched.appointmentType && formikProps.errors.appointmentType}
                  value=' '
                  editable={false}
                />
                <View style={{ position: 'relative', bottom:58}}>
                  <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    items={ appointmentTypeProps }
                    placeholder={{label: 'Seleccionar tipo de atención'}}
                    onValueChange={(value) => {
                      if (value) {
                          formikProps.values.appointmentType = value
                      } else {
                          formikProps.values.appointmentType = ''
                      }
                    }}
                  />
                </View>
              </View>

              <View style={{marginVertical: -45}}>
                <OutlinedTextField 
                  label='Modalidad(es) de atención'
                  error={formikProps.touched.modalities && formikProps.errors.modalities}
                  value=' '
                  editable={false}
                />
                <View style={{position: 'relative', bottom:67}}>
                  <SectionedMultiSelect 
                    items={modalitiesDisplay()}
                    uniqueKey="id"
                    subKey="children"
                    selectText="¿Qué modalidad de atención buscas?"
                    confirmText='Confirmar'
                    searchPlaceholderText='Buscar'
                    selectedText='seleccionados'
                    modalWithSafeAreaView={true}
                    showDropDowns={false}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={setModalities}
                    selectedItems={modalities, formikProps.values.modalities = modalities}
                  />
                </View>
              </View>
                    
              <View style={{marginVertical: -10}}>
                <OutlinedTextField 
                    label='Precio mínimo'
                    onChangeText={formikProps.handleChange('minPrice')}
                    value={formikProps.values.minPrice > 0 ? formikProps.values.minPrice : ''}
                    error={formikProps.touched.minPrice && formikProps.errors.minPrice}
                    autoCorrect={false}  
                    keyboardType='number-pad'
                />
              </View>

              <View style={{marginVertical: 20}}>
                <OutlinedTextField 
                    label='Precio máximo'
                    onChangeText={formikProps.handleChange('maxPrice')}
                    value={formikProps.values.maxPrice > 0 ? formikProps.values.maxPrice : ''}
                    error={formikProps.touched.maxPrice && formikProps.errors.maxPrice}
                    autoCorrect={false} 
                    keyboardType='number-pad'  
                />
              </View>

              <View>
                <OutlinedTextField 
                  label='¿Qué previsión tienes?'
                  onChangeText={formikProps.handleChange('prevision')}
                  error={formikProps.touched.prevision && formikProps.errors.prevision}
                  value=' '
                  editable={false}
                />
                <View style={{ position: 'relative', bottom:58}}>
                  <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    items={ previsionsDisplay() }
                    placeholder={{label: 'Seleccionar previsión'}}
                    onValueChange={(value) => {
                      if (value) {
                          formikProps.values.prevision = value
                      } else {
                          formikProps.values.prevision = 'Ninguna'
                      }
                    }}
                  />
                </View>
              </View>

              <View style={{marginVertical: -45}}>
                <OutlinedTextField 
                  label='¿Con qué género prefieres atenderte?'
                  onChangeText={formikProps.handleChange('gender')}
                  error={formikProps.touched.gender && formikProps.errors.gender}
                  value=' '
                  editable={false}
                />
                <View style={{ position: 'relative', bottom:58}}>
                  <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    items={ sex_props }
                    placeholder={{label: 'Seleccionar género'}}
                    onValueChange={(value) => {
                      if (value) {
                          formikProps.values.gender = value
                      } else {
                          formikProps.values.gender = 'Cualquiera'
                      }
                    }}
                  />
                </View>
              </View>
              </ScrollView>
            </View>
          )}
        </Formik>
      </View>
    )
    }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});