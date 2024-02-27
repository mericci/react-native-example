import { GET_PROFILE_INFO, RESET_PROFILE_INFO } from '../actions/Types';

const initialState = {
  id: '',
  email: '',
  name: '',
  lastname: '',
  studies: [],
  specialties: [],
  fechaNacimiento: '',
  genero: '',
  photo: {},
  valido: false,
  tipoProfesional: []
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
      case GET_PROFILE_INFO:
        return {
          ...state,
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          lastname: action.payload.lastname,
          studies: action.payload.studies,
          specialties: action.payload.specialties,
          fechaNacimiento: action.payload.fechaNacimiento,
          genero: action.payload.genero,
          photo: action.payload.photo,
          valido: action.payload.valido,
          tipoProfesional: action.payload.tipoProfesional,
        }
      case RESET_PROFILE_INFO:
        return {
          ...state,
          email: '',
          name: '',
          lastname: '',
          studies: [],
          specialties: [],
          fechaNacimiento: '',
          genero: '',
          photo: {},
          valido: false,
          tipoProfesional: []
        }
      default:
        return state;
    }
  }
  
  export default profileReducer;