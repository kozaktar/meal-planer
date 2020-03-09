import {combineReducers} from 'redux';
import SignInModalReducer from './sign-in-modal/sign-in-modal.reducer';
import UserReducer from './user/user.reducer'
import RecipesReducer from './recipes/recipes.reducer'

const rootReducer=combineReducers({
    signInModal: SignInModalReducer,
    user: UserReducer,
    recipes: RecipesReducer
})

export default rootReducer;