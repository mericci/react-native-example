import { 
  START_CONSULTATIONS_FETCH, 
  RESET_CONSULTATIONS, 
  SET_UBICATION_ID, 
  SET_CONSULTATION_DATA,
  START_INSTITUTION_FETCH,
  RESET_INSTITUTION, 
  START_MEMBERS_FETCH,
  RESET_MEMBERS
} from '../actions/Types';

const initialState = {
    data: null,
    ubicationID: '',
    consultationData: null, 
    institutionData: null,
    membersData: null,
    ubicationData: null,
}

const consultationsReducer = (state = initialState, action) => {
    switch(action.type){
      case START_CONSULTATIONS_FETCH:
        return ({
          ...state,
          data: action.payload
        })
      case RESET_CONSULTATIONS:
        return ({
          ...state,
          data: null
        })
      case SET_UBICATION_ID:
        return ({
          ...state,
          ubicationID: action.payload
        })
      case SET_CONSULTATION_DATA:
        return ({
          ...state,
          consultationData: action.payload
        })
      case START_INSTITUTION_FETCH:
        return ({
          ...state,
          institutionData: action.payload.ubicacion.institucion,
          ubicationData: action.payload.ubicacion,
        })
      case RESET_INSTITUTION:
        return ({
          ...state,
          institutionData: null
        })
      case START_MEMBERS_FETCH:
        return ({
          ...state,
          membersData: action.payload
        })
      case RESET_MEMBERS:
        return ({
          ...state,
          membersData: null
        })
      default:
        return state;
    }
  }
  
  export default consultationsReducer;