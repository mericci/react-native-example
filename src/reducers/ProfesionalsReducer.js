import { GET_PROFESIONALS } from '../actions/Types';

const initialState = {
  profesionals: null
}

const profesionalReducer = (state = initialState, action) => {
    switch(action.type){
      case GET_PROFESIONALS:
        return {
          ...state,
          profesionals: action.payload
        }
      default:
        return state;
    }
  }
  
  export default profesionalReducer;