import React, {useState, useEffect} from 'react';
import { View, Text, Image, Modal, ScrollView,ActivityIndicator } from 'react-native';
import { globalStyles } from '../../../../assets/styles/Global';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { Divider, Button, List } from 'react-native-paper';
import CreateConsultationForm from './CreateConsultationForm';
import ListItem from './ListItem';
import { colors } from '../../../../assets/styles/Colors';

export default function Consultations({ navigation, onPressHandler, onPressProfileHandler, checkProfile }) {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);

  state = useSelector(state => state)
  const profilePhoto = navigation.getParam('fotoPerfil');

  const UserInInstitution = () => {
    setShowButton(state.consultations.data.profesional.id === state.isLogin.professionalId)
  }

  const filterConsultations = () => {
    var first_filter = state.consultations.data.profesional.consultasSet.edges.filter((element) => {
      return element.node.ubicacion.id == state.consultations.ubicationID;
    })
    if (state.search.searchResults) {
      return first_filter.filter(consultation => {
        var present = false
        state.search.searchResults.consultas.forEach(consulta => {
          if (consulta.id === consultation.node.id) {
            present = true
          }
        })
        return present;
      })
    } else {
      return first_filter
    }
  }  

  useEffect(()=>{
    if(state.isLogin.login){
      UserInInstitution()
    }
  })

  return (
    <ScrollView style={{ flex: 1}}>
      <View style={globalStyles.profileContainer}> 
        <View>
          <Modal
            animationType="fade"
            visible={show}
            transparent={true}
          >
            <CreateConsultationForm setShow={setShow} mode='create' ubicationId={state.consultations.ubicationID} />
          </Modal>
        </View>

        <View style={{...globalStyles.profileContent, marginTop: 100, }}>
          <View style={globalStyles.profileImageContainer}>
            {
              profilePhoto && profilePhoto.nombre !== "{}" ?
                <Image style={globalStyles.profileImage} source={{uri: profilePhoto.url, height: 140, width: 140}}/> 
              :
                <Image style={globalStyles.profileImage} source={require('../../../../assets/images/user.png')}/> 
            }
          </View>
          <Text style={{ fontSize: 16, marginTop: 10 }}>Consultas en {state.consultations.institutionData.nombre}  de</Text>
          <Text style={{...globalStyles.institutionName, marginBottom: 0}}>
            {state.consultations.data.profesional.nombre + ' ' + state.consultations.data.profesional.apellido}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
            {
              checkProfile &&
              <Button  
                color={ colors.link }
                compact
                icon='eye'
                onPress={onPressProfileHandler}
              >Ver perfil</Button>
            }
            {
              showButton && (
                <Button 
                  compact
                  icon='plus'
                  onPress={() => {setShow(true)}} 
                  color={ colors.link }
                >Agregar Consulta</Button>
              )
            }
          </View>
          
          <Text style={globalStyles.segmentTitle}>Consultas</Text>
          <Divider />
          <List.Section>
            { filterConsultations().map((item) => (
              <ListItem key={item.node.id} item={item} onPressHandler={onPressHandler} showButton={showButton}/>
            ))}
          </List.Section>
        </View>
        
      </View>
    </ScrollView>
  );
}