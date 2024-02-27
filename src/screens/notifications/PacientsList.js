import React, {useState} from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { globalStyles } from '../../../assets/styles/Global';
import { queries } from '../../handlers/Queries';
import { colors } from '../../../assets/styles/Colors';
import { Divider, TextInput, Button, List, Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function PacientsList({navigation}) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const [name, setName] = useState('');
  const [options, setOptions] = useState([]);

  const { loading, data, error } = useQuery(queries.allPacientes);
  
  const handleSearch = () => {
    setOptions([])
    var names_items = name.split(" ");
    var ids = []
    names_items.forEach(item => {
      data.allPacients.edges.forEach(pacient => {
        if(!ids.includes(pacient.node.id)){
          if(pacient.node.nombre.toUpperCase().includes(item.toUpperCase()) || pacient.node.apellido.toUpperCase().includes(item.toUpperCase())){
            setOptions((options) => {
              return [{nombre: pacient.node.nombre, apellido: pacient.node.apellido, id:pacient.node.id, email:pacient.node.email, fotoPerfil:pacient.node.fotoPerfil, fechaNacimiento:pacient.node.fechaNacimiento, genero: pacient.node.genero}, ...options]
            })
            ids.push(pacient.node.id)
          }
        }
      })
    });
  }
  
  return(
    <ScrollView style={{ flex: 1 }}>
      <View>
      <View style={globalStyles.segment}>
        <Text style={globalStyles.segmentTitle}>Buscar usuario</Text>
        <Divider style={{ marginBottom: 5 }}/>
        <Text style={globalStyles.segmentText}>Ingresa el nombre del usuario que quieres contactar.</Text>
        <TextInput 
          label='Usuario'
          onChangeText={(value) => {setName(value)}}
          value={name}
          mode='outlined'
          dense
        />
        <Button 
          color={colors.link}
          mode='contained'
          style={{ marginVertical: 5 }}
          onPress={()=>{handleSearch()}}
        >Buscar</Button>
      </View>
      <List.Section title='Resultados'>
        <FlatList 
          data={options}
          keyExtractor ={(item) => item.id}
          renderItem = {({ item }) => (
            <View style={{...globalStyles.segment, marginVertical: 5, alignSelf: 'center', padding: 0 }}>
              <List.Item 
                title={ item.nombre + ' ' + item.apellido }
                left={props => item.fotoPerfil && item.fotoPerfil.nombre !== "{}" ? 
                  <Avatar.Image source={{uri: item.fotoPerfil.url, height: 64, width: 64}}/> : 
                  <Avatar.Text label={item.nombre.substring(0, 1) + item.apellido.substring(0, 1) } />
                }
                onPress={() => {
                  navigation.navigate('PacientProfile', { id: item.id, isProfessional: false});
                }}
              />
            </View>
          )}    
        />
      </List.Section>
      </View>
    </ScrollView>
    );
  }
  