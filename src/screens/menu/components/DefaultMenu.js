import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import { DrawerItems } from 'react-navigation-drawer';

export default function DefaultMenu(props, navigation) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  function HandleLogIn() {
    dispatch({ type:'OPEN_LOGIN_MODAL' });
  }

  return(
    <View>
      <View style={globalStyles.menuUserInfo}>
        <View style={globalStyles.menuProfileButton}>
          <Button title='Log In' onPress={HandleLogIn} />
        </View>
      </View>
      <View>
        <DrawerItems {...props}/>
      </View>
    </View>
  );
}