import {SET_OWN_POSITION} from '../actions/Types';

// Initial position: Santiago
const initialState = {
  coords: {
    latitude: -33.4569397,
    longitude: -70.6482697,
    latitudeDelta: 0.25, 
    longitudeDelta: 0.25,
  }
}

const positionReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_OWN_POSITION:
      return {
        ...state,
        coords: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: 0.15, 
          longitudeDelta: 0.15,
        }
      }
    default:
      return state;
  }
}
  
export default positionReducer;