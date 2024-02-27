import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultMenu from './components/DefaultMenu';
import LoggedMenu from './components/LoggedMenu';

export default function Menu(props) {
  state = useSelector(state => state);
  dispatch = useDispatch();

  if (state.isLogin.login) {
    return (<LoggedMenu {...props}/>)
  } else {
    return (<DefaultMenu {...props}/>)
  }
}