import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../assets/styles/Global';
import { NavigationActions } from 'react-navigation';
import MainButtton from '../shared/MainButton'
import { LinearGradient } from 'expo-linear-gradient';
import RegisterTypeModal from './components/RegisterTypeModal'
import { colors } from '../../../assets/styles/Colors';
import InfoModal from './components/InfoModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  state = useSelector(state => state);
  dispatch = useDispatch();

  function HandleLogIn() {
    dispatch({ type:'OPEN_LOGIN_MODAL' });
  }

  return(
    <LinearGradient colors={[colors.primary, '#192f6a']} style={globalStyles.homeContainer}>
      <RegisterTypeModal 
        navigation={navigation}
        showModal={showModal} 
        setShowModal={setShowModal} 
      />
      <InfoModal 
        showModal={showInfo}
        setShowModal={setShowInfo}
      />
      <TouchableOpacity style={{ alignItems: 'center'}} onPress={() => {setShowInfo(true)}}>
        <View style={{...globalStyles.homeImageContainer, marginVertical: -20, }}>
          <Image style={globalStyles.homeImage} source={require('../../../assets/images/logo.png')}/>
        </View>
        <MaterialCommunityIcons name='information-outline' color='white' size={24}/>
      </TouchableOpacity>
      <View style={{ width: '100%', alignItems: 'center',}}>
        <MainButtton
          title='Buscar profesional'
          icon='magnify'
          color='success'
          onPress={() => navigation.navigate({
            routeName: 'Search',
            action: NavigationActions.navigate({ routeName: 'Map' })
          })}
        />
        <MainButtton
          title='Iniciar sesion'
          icon='login-variant'
          color='secondary'
          onPress={HandleLogIn}
        />
        <MainButtton
          title='Registrarse'
          icon='account-circle-outline'
          color='secondary'
          onPress={() => setShowModal(true)}
        />
      </View>
    </LinearGradient>
  );
}
