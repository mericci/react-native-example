import { createStore, combineReducers } from 'redux';
import loginReducer from '../reducers/LoginReducer';
import consultationsReducer from '../reducers/ConsultationsReducer';
import loginModalReducer from '../reducers/LoginModalReducer';
import ubicationsReducer from '../reducers/UbicationsReducer';
import registerReducer from '../reducers/RegisterReducer';
import positionReducer from '../reducers/PositionReducer';
import profileReducer from '../reducers/ProfileReducer';
import institutionReducer from '../reducers/InstitutionReducer';
import searchReducer from '../reducers/SearchReducer';
import profesionalsReducer from '../reducers/ProfesionalsReducer';


const rootReducer = combineReducers({
    isLogin: loginReducer,
    loginModal: loginModalReducer,
    ubications: ubicationsReducer,
    consultations: consultationsReducer,
    register: registerReducer,
    position: positionReducer,
    profile: profileReducer,
    institution: institutionReducer,
    search: searchReducer,
    profesionals: profesionalsReducer,

})

export default createStore(rootReducer);