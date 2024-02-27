import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../login/Login';
import DefaultTabs from '../../../routes/bottomTab/DefaultTabs'
import LoggedProfesionalTabs from '../../../routes/bottomTab/LoggedProfesionalTab'
import LoggedPacientTabs from '../../../routes/bottomTab/LoggedPacientTab'

export default function Landing() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.isLogin.login) {
    if(state.isLogin.isProfesional){
      return ([
      <LoggedProfesionalTabs key="loggedtabs"/>
      ])
    } else {
      return ([
        <LoggedPacientTabs key="loggedtabs"/>
      ])
    }
  } else {
    return ([
      <DefaultTabs key="defaulttabs"/>,
      <Login key="loginmodal"/>
    ])
  }
}