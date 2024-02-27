import {SET_CREATE_INSTITUTION_DATA, LOADING_INSTITUTION_DATA, CHANGE_INSTITUTION_POS, GET_INSTITUTIONS, SET_ADD_UBICATION_DATA, SET_INSTITUTION_DATA} from '../actions/Types';

// Initial position: Santiago
const initialState = {
  loading: true,
  data: {
    name: '',
    description: '',
    address: '',
    region: '',
    city: '',
    latitude: 0,
    longitude: 0,
  },
  allInstitutions: [],
  institutionData: {
    name: '',
    description: '',
    id: '',
  },
}

const institutionReducer = (state = initialState, action) => {
  switch(action.type){
    case LOADING_INSTITUTION_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_CREATE_INSTITUTION_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SET_ADD_UBICATION_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case CHANGE_INSTITUTION_POS:
      return {
        ...state,
        data: {
          name: state.data.name,
          description: state.data.description,
          address: state.data.address,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          region: state.data.region,
          city: state.data.city
        },
      };
    case GET_INSTITUTIONS:
      return {
        ...state,
        allInstitutions: action.payload
      }
    case SET_INSTITUTION_DATA:
      return {
        ...state,
        institutionData: action.payload
      }
    default:
      return state;
  }
}
  
export default institutionReducer;