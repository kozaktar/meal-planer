import {combineReducers} from 'redux';
import SignInModalReducer from './sign-in-modal/sign-in-modal.reducer';
import UserReducer from './user/user.reducer'

const rootReducer=combineReducers({
    signInModal: SignInModalReducer,
    user: UserReducer
})

export default rootReducer;