import {combineReducers} from 'redux';
import SignInModalReducer from './sign-in-modal/sign-in-modal.reducer';
import UserReducer from './user/user.reducer'
import RecipesReducer from './recipes/recipes.reducer'
import AddRecipeModalReducer from './addRecipeModal/addRecipeModal.reducer';
import ShopingListReducer from './shopingList/shopingList.reducer';

const rootReducer=combineReducers({
    signInModal: SignInModalReducer,
    user: UserReducer,
    recipes: RecipesReducer,
    addRecipeModal:AddRecipeModalReducer,
    shopingList: ShopingListReducer
})

export default rootReducer;