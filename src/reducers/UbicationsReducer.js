import {GET_UBICATIONS, SET_WAITING} from '../actions/Types';

const initialState = {
    ubications: null,
    isWaiting: true
}

const ubicationsReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_UBICATIONS:
      return {
        ...state,
        ubications: action.payload,
        isWaiting: false
      };
    case SET_WAITING:
      return {
        ...state,
        isWaiting: true
      }
    default:
      return state;
  }
}
  
export default ubicationsReducer;