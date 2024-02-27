import {LOGIN, LOGOUT} from '../actions/Types';

const initialState = {
    login: false,
    username: null,
    token: null,
    id: null,
    professionalId: null,
    pacientId: null,
    isProfesional: false
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
      case LOGIN:
        return {
          ...state,
          login: true,
          username: action.payload.username,
          token: action.payload.token,
          id: action.payload.id,
          professionalId: action.payload.professionalId,
          pacientId: action.payload.pacientId,
          isProfesional: action.payload.isProfesional,
        };
      case LOGOUT:
        return {
          ...state,
          login: false,
          username: null,
          token: null,
          id: null,
          professionalId: null,
          pacientId: null,
          isProfesional: false
        };
      default:
        return state;
    }
  }
  
  export default loginReducer;