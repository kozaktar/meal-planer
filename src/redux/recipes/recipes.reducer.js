import RecipeActionTypes from './recipes.types';

const INITIAL_STATE={
    recipes:null,
    loading:false,
    recipesError:null
}

const recipesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case RecipeActionTypes.FETCH_RECIPES_START:
            return {loading:true,...state}
        case RecipeActionTypes.FETCH_RECIPES_SUCCESS:
            return {loading:false, recipes:action.payload, recipesError:null};  
        case RecipeActionTypes.FETCH_RECIPES_FAILURE:
            return {recipesError:action.payload,...state};
        default:
            return state;  
    }
}

export default recipesReducer;