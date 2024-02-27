import {GET_DATA_REGISTER, WAIT_DATA_REGISTER} from '../actions/Types';

const initialState = {
    fetchData: true,
    especialidades: [],
    universidades: [],
    tipoProfesional: []
}

const registerReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_DATA_REGISTER:
        return {
            ...state,
            especialidades: action.payload.especialidades,
            universidades: action.payload.universidades,
            tipoProfesional: action.payload.tipoProfesional,
            fetchData: false,
        };
    case WAIT_DATA_REGISTER:
        return {
            ...state,
            fetchData: true,
        };
    default:
      return state;
  }
}
  
export default registerReducer;