import React, {useState, useEffect} from 'react';
import { View, Text, ActivityIndicator, Modal, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../../handlers/Queries';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Button, List } from 'react-native-paper';
import { colors } from '../../../assets/styles/Colors';
import { ScrollView } from 'react-native-gesture-handler';

export default function JoinInstitution({showModal, setShowModal, profile, navigation, requested}) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const [name, setName] = useState('')
  const [options, setOptions] = useState([])

  const { loading, data, error } = useQuery(queries.getAllInstitutionsQuery, { pollInterval: 1000 })
  const [joinInstitution, { joinData }] = useMutation(queries.joinInstitution)

  const filter = (institutionNode) => {
    var notIncluded = true
    profile.institucionesSet.edges.forEach(element => {
      if (institutionNode.id == element.node.id){
        notIncluded = false;
      }
    });
    return notIncluded
  }

  useEffect(() => {
    const onCompleted = (data) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: data.allInstituciones.edges.filter(
        (item) => (item.node.valida && !requested.includes(item.node.id))
      )});
    }
    const onError = (error) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: [] })
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error){
        onCompleted(data)
      } else if (onError && !loading && error){
        onError(error)
      }
    }
  }, [loading, data, error]);

  async function onPressInstitutionHandler(item) {
    Alert.alert("Confirmar", 
      'Al aceptar se enviará una solicitud a ' + item.nombre, 
      [{ text: 'Aceptar', onPress: () => 
        joinMutation(item.id, profile.id)
      },
      { text: 'Cancelar', style: 'cancel'}
    ]);
  }

  const joinMutation = (institutionId, profesionalId) => {
    joinInstitution({ variables: { institutionId, profesionalId }})
      .then(json => {
        if("errors" in json) {
          alert(json.data.createSolicitudJoinInstitution.errors);
        }
        setOptions([]);
        setShowModal(false)
      })
      .catch(error => {
        alert('Lo sentimos, has alcanzado el máximo de solicitudes')
      })
  }

  const handleSearch = () => {
    setOptions([])
    var names_items = name.split(" ");
    var ids = []
    names_items.forEach(item => {
        state.institution.allInstitutions.forEach(institution => {
            if(!ids.includes(institution.node.id)){
                if(institution.node.nombre.toUpperCase().includes(item.toUpperCase())){
                    setOptions((options) => {
                        return [{nombre: institution.node.nombre,  id: institution.node.id}, ...options]
                    })
                    ids.push(institution.node.id)
                }
            }
        })
    });
  }

  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
    >
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        { (loading) ? <ActivityIndicator /> : (
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.title}>Buscar Institución</Text>
            </View>
            <View style={styles.form}>
              <TextInput 
                label='Institución'
                value={name}
                mode='outlined'
                dense={true}
                onChangeText={(value) => {setName(value)}}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
                <Button onPress={() => setShowModal(false)} color={colors.danger}>Cancelar</Button>
                <Button onPress={()=>{handleSearch()}} color={colors.link}>Buscar</Button>
              </View>
            </View>
            <ScrollView style={{ width: '100%', flex: 1  }}>
              <List.Section title='Resultados'>
                { options.filter(filter).map((item) => (
                  <List.Item
                    key={item.id}
                    title={item.nombre}
                    titleNumberOfLines={2}
                    onPress={() => onPressInstitutionHandler(item)}
                    left={() => <List.Icon color={colors.primary} icon="office-building" />}
                  />
                ))}
              </List.Section> 
            </ScrollView>           
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
    height: '70%',
  },
  background: {
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
  header: {
    padding: 10,
    backgroundColor: colors.secondary,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  form: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
  }
});