import {combineReducers} from 'redux';
import SignInModalReducer from './sign-in-modal/sign-in-modal.reducer';

const rootReducer=combineReducers({
    signInModal: SignInModalReducer
})

export default rootReducer;