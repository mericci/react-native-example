import { SET_FILTERS, GET_DATA_SEARCH, SET_SEARCH_RESULT } from '../actions/Types';

const initialState = {
  filters: null,
  regions: [],
  pathologies: [],
  profesionalTypes: [],
  modalities: [],
  previsions: [],
  searchResults: null
}

const searchReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          orderBy: action.payload.orderBy,
          pathologies: action.payload.pathologies,
          regions: action.payload.regions,
          cities: action.payload.cities,
          age: action.payload.age,
          profesionalType: action.payload.profesionalType,
          appointmentType: action.payload.appointmentType,
          modalities: action.payload.modalities,
          maxPrice: action.payload.maxPrice,
          minPrice: action.payload.minPrice,
          prevision: action.payload.prevision,
          gender: action.payload.gender,
        }
      };
    case GET_DATA_SEARCH:
      return {
        ...state,
        regions: action.payload.regions,
        pathologies: action.payload.pathologies,
        profesionalTypes: action.payload.profesionalTypes,
        modalities: action.payload.modalities,
        previsions: action.payload.previsions
      };
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResults: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer;