import {OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL} from '../actions/Types';

const initialState = {
    visible: false
}

const loginModalReducer = (state = initialState, action) => {
    switch(action.type){
      case OPEN_LOGIN_MODAL:
        return {
          ...state,
          visible: true
        };
      case CLOSE_LOGIN_MODAL:
        return {
          ...state,
          visible: false
        };
      default:
        return state;
    }
  }
  
  export default loginModalReducer;