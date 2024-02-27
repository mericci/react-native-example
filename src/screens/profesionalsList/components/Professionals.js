import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { useSelector } from 'react-redux';
import { colors } from '../../../../assets/styles/Colors';
import { Divider, ActivityIndicator, Avatar, Button, Searchbar, List } from 'react-native-paper';

export default function Professionals({ onPressHandler, handleMapToggle, toggleFiltersVisible }) {

  state = useSelector(state => state)

  const [professionalsResults, setProfessionalsResults] = useState([])
  const [options, setOptions] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const [name, setName] = useState('')

  const filterProfesionals = () => {
    if (state.search.searchResults) {
      setProfessionalsResults(state.search.searchResults.profesionales)
    } else {
      setProfessionalsResults(state.profesionals.profesionals.map(profesional => {
        return profesional.node
      }))
    }
  }

  const especialidadesToString = (item) => {
    const modalidadesNames = item.especialidadesSet.edges.map(element => {
      return element.node.nombre;
    })
    return modalidadesNames.join(', ')
  }

  const handleSearch = (name) => {
    setOptions([])
    var names_items = name.split(" ");
    var ids = []
    names_items.forEach(item => {
      professionalsResults.forEach(professional => {
          if(!ids.includes(professional.id)){
              if(professional.nombre.toUpperCase().includes(item.toUpperCase()) || professional.apellido.toUpperCase().includes(item.toUpperCase())){
                  setOptions((options) => {
                      return [{nombre: professional.nombre, 
                        apellido: professional.apellido, 
                        especialidadesSet: professional.especialidadesSet, 
                        id: professional.id, 
                        fotoPerfil:professional.fotoPerfil, 
                      }, ...options]
                  })
                  ids.push(professional.id)
              }
          }
      })
    });
    setShowOptions(true)
  }

  useEffect(() => {
    filterProfesionals()
  }, [state.search.searchResults]);

  if (!state.profesionals.profesionals) {
    return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator/></View>)
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
          <Button
            onPress={handleMapToggle}
            color={colors.link}
            mode='contained'
            icon='map'
            compact={true}
          >
            Volver al mapa
          </Button>
          <Button
            onPress={toggleFiltersVisible}
            color={colors.warning}
            mode='contained'
            icon='filter'
            compact={true}
          >
            Filtrar búsqueda
          </Button>
        </View>
        <View style={{...globalStyles.segment, alignSelf: 'center'}}>
          <Text style={globalStyles.segmentTitle}>Lista de profesionales</Text>
          <Divider />
          <Text style={globalStyles.segmentText}>
            A continuación aparece la lista de todos los profesionales disponibles. Si lo deseas puedes buscar a alguien en específico ingresando su nombre.
          </Text>
        </View>
        <Searchbar 
          placeholder='Nombre'
          onChangeText={(value) => {
            setName(value)
            handleSearch(value)
          }}
          value={name}
          style={{ width: '95%', alignSelf: 'center'}}
        />
        <List.Section title='Resultados'>
          <FlatList 
            data={showOptions ? options : professionalsResults}
            style={{paddingBottom: 10}}
            renderItem = {({ item }) => (
              <View style={{...globalStyles.segment, marginVertical: 5, alignSelf: 'center', padding: 0 }}>
                <List.Item 
                  title={item.nombre + ' ' + item.apellido}
                  description={'Especialidades: ' + especialidadesToString(item)}
                  descriptionNumberOfLines={3}
                  onPress={() => onPressHandler(item)}
                  left={props => item.fotoPerfil && item.fotoPerfil.nombre !== "{}" ? 
                    <Avatar.Image source={{uri: item.fotoPerfil.url, height: 64, width: 64}}/> : 
                    <Avatar.Text label={item.nombre.substring(0, 1) + item.apellido.substring(0, 1) } />
                  }
                />
              </View>
            )}
            keyExtractor ={(item) => item.id}
          />
        </List.Section>
      </View>
    );
  }
}