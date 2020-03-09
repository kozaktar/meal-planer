import RecipeActionTypes from './recipes.types';

const INITIAL_STATE={
    recipes:[],     //stores recipes collection  
    loading:false,    //true when recies are being fetched
    addingRecipe:false, //true when uploading recipe in progress
    recipesError:null,   //contains error message for recipes
    addingRecipeError:true
}

const recipesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case RecipeActionTypes.FETCH_RECIPES_START:
            return {...state, loading:true}
        case RecipeActionTypes.ADD_RECIPES_START:
            return {...state, addingRecipe:true}
        case RecipeActionTypes.FETCH_RECIPES_SUCCESS:
            {
                console.log(action.payload)
                return {...state, loading:false, recipes:[...state.recipes , ...action.payload], recipesError:null}; 
            }
           
        case RecipeActionTypes.ADD_RECIPES_SUCCESS:
            return {...state, addingRecipe:false, recipes:[...state.recipes, action.payload], addingRecipeError:null};     
        case RecipeActionTypes.FETCH_RECIPES_FAILURE:
            return {...state, recipesError:action.payload};
        case RecipeActionTypes.ADD_RECIPES_FAILURE:
            return {...state, addingRecipeError:action.payload};
        default:
            return state;  
    }
}

export default recipesReducer;