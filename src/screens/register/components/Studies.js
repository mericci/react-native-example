import React, {useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {OutlinedTextField} from 'react-native-material-textfield';
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper';

export default function Studies({ formikProps, data, studiesSelect, setstudiesSelect }) {
  const [universidades, setUniversidades] = useState({})
  const [grados, setGrados] = useState({})

  const [grado, setGrado] = useState('')
  const [universidad, setUniversidad] = useState('')


  var inputRef = React.createRef();

  const grado_options =[
    {label: 'Licenciado', value:{id:'LICENCIADO', nombre: 'Licenciado'}},
    {label: 'Profesional', value: {id: 'PROFESIONAL', nombre: 'Profesional'}},
    {label: 'Técnico', value: {id: 'TECNICO', nombre: 'Técnico'}},
    {label: 'Diplomado', value: {id: 'DIPLOMADO', nombre: 'Diplomado'}},
    {label: 'Magister', value: {id: 'MAGISTER', nombre: 'Magister'}},
    {label: 'Doctorado', value: {id: 'DOCTORADO', nombre: 'Doctorado'}}
  ]
  
  const addStudie = (estudios, desc, universidad, grado) => {
    setUniversidades((universidades) => {
      return {['"' + universidad.id + '"']: universidad.nombre, ...universidades}
    })
    setGrados((grados) => {
      return {[grado.id]: grado.nombre, ...grados}
    })
    var studie = {
      'descripcion': desc,
      'grado': grado.id,
      'universidad': '"' + universidad.id + '"',
    }
    setstudiesSelect((studiesSelect) => {
      return [studie, ...studiesSelect]
    });
    estudios = studiesSelect;
  }

  const removeStudie = (descripcion) => {
    setstudiesSelect(studiesSelect => {
      return studiesSelect.filter((studie) => studie.descripcion !== descripcion);
    });
  };

  return(
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <FlatList 
          data={studiesSelect}
          keyExtractor ={(item) => item.descripcion}
          renderItem={({item}) => (
            <List.Item
              title={grados[item.grado] + ' en ' + item.descripcion}
              description={universidades[item.universidad]}
              style={{ padding: 0}}
              right={props => <TouchableOpacity onPress={()=>removeStudie(item.descripcion)}>
                <List.Icon {...props} icon="close"/>
                </TouchableOpacity>
              }
            />
          )}
        />
      </View>

      <OutlinedTextField 
        ref={inputRef}
        label='Descripción'
        value={formikProps.values.description}
        onChangeText={formikProps.handleChange('description')}
      />
    
      <OutlinedTextField 
        label='Universidad'
        value=' '
        editable={false}
      />
      
      <View style={{position: 'relative', bottom:58, marginBottom: -52}}>
        <RNPickerSelect
          style={{...pickerSelectStyles}}
          items={ data.allUniversidades.edges.map(item => ({label: item.node.nombre, value: {id: item.node.id, nombre: item.node.nombre}}))}
          value={universidad}
          placeholder={{label: 'Seleccionar universidad'}}
          onValueChange={(value) => {
            if (value) {
              setUniversidad(value)
              formikProps.values.universidad = value
            } else {
              setUniversidad('')
              formikProps.values.universidad = ''
            }
          }}
        />
      </View>
      <View style={{marginBottom:0}}>
        <OutlinedTextField 
          label='Grado'
          value=' '
          editable={false}
        />
        <View style={{position: 'relative', bottom:58, marginBottom: -62}}>
          <RNPickerSelect
            style={{...pickerSelectStyles}}
            items={grado_options}
            placeholder={{label: 'Seleccionar grado'}}
            value={grado}
            onValueChange={(value) => {
              if (value) {
                setGrado(value)
                formikProps.values.grado = value
              } else {
                setGrado('')
                formikProps.values.grado = ''
              }
            }}
          />
        </View>
      </View>
      <Button
        icon='plus'
        style={{ marginVertical: 10, }}
        onPress={() => {
          addStudie(formikProps.values.studies, 
            formikProps.values.description, 
            formikProps.values.universidad, 
            formikProps.values.grado
          )
          inputRef.current.setValue('')
          setGrado('')
          setUniversidad('')

        }}
      >Agregar estudio</Button>
      
    </View>
  )
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