import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import { DrawerItems } from 'react-navigation-drawer';

export default function LoggedMenu(props) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  function HandleLogOut() {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'RESET_PROFILE_INFO' })
  }

  return(
    <View>
      <View style={globalStyles.menuUserInfo}>
        <View>
          <Image style={globalStyles.menuProfileImage} source={require('../../../../assets/images/user.png')}/>
        </View>
        <Text style={globalStyles.menuProfileText}> Bienvenido {state.isLogin.username} </Text>
        <View style={globalStyles.menuProfileButton}>
          <Button title='Log Out' onPress={HandleLogOut}/>
        </View>
      </View>
      <View>
        <DrawerItems {...props}/>
      </View>
    </View>
  );
}