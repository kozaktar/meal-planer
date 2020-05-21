import RecipeActionTypes from './recipes.types';

const INITIAL_STATE={
    recipes:[],     //stores recipes collection  
    loading:true,    //true when recies are being fetched
    recipesError:null,   //contains error message for recipes
    addingRecipeError:null,
    addingRecipe:false, //true when uploading recipe in progress
    userRecipesTitles:[],
    fetchingRecipeTitles: false,
    fetchingRecipeTitlesError:null,
    searchQuery:null,
    searchResults:[],
    recipeSearching:false,
    recipeSearchError:null,
    recipePageRecipe:null,
}

const recipesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case RecipeActionTypes.FETCH_RECIPES_START:
            return {...state, loading:true};
        case RecipeActionTypes.FETCH_RECIPE_BY_ID_START:
            return {...state, recipePageLoading:true};
        case RecipeActionTypes.FETCH_SEARCHED_RECIPES_START:
            return {...state, recipeSearching:true, searchQuery:action.payload};    
        case RecipeActionTypes.FETCH_USER_RECIPES_TITLES_START:
            return {...state, fetchingRecipeTitles:true};
        case RecipeActionTypes.FETCH_USER_RECIPES_TITLES_SUCCESS:
            return {...state, userRecipesTitles:action.payload, fetchingRecipeTitles:false};    
        case RecipeActionTypes.FETCH_SEARCHED_RECIPES_SUCCESS:
            return {...state, searchResults:action.payload, recipeSearching:false};            
        case RecipeActionTypes.ADD_RECIPES_START:
            return {...state, addingRecipe:true}
        case RecipeActionTypes.FETCH_RECIPES_SUCCESS:
            return {...state, loading:false, recipes:[...state.recipes , ...action.payload], recipesError:null}; 

        case RecipeActionTypes.FETCH_RECIPE_BY_ID_SUCCESS:
            return {...state, recipePageLoading:false, recipePageRecipe:action.payload};
        
        case RecipeActionTypes.ADD_RECIPES_SUCCESS: 
            return {...state, addingRecipe:false, recipes:[ action.payload, ...state.recipes,], addingRecipeError:null}; 

        case RecipeActionTypes.FETCH_RECIPES_FAILURE:
            return {...state, recipesError:action.payload, loading:false};
        case RecipeActionTypes.ADD_RECIPES_FAILURE:
            return {...state, addingRecipeError:action.payload, addingRecipe:false};
        case RecipeActionTypes.FETCH_USER_RECIPES_TITLES_FAILURE:
            return {...state, fetchingRecipeTitlesError:action.payload, fetchingRecipeTitles:false};   
        case RecipeActionTypes.FETCH_SEARCHED_RECIPES_FAILURE:
            return {...state, recipeSearchError:action.payload, recipeSearching:false};     
        case RecipeActionTypes.CLEAR_RECIPES:
            return {...state, recipes:[]};
         
        case RecipeActionTypes.CLEAR_SEARCH_QUERY:
            return {...state, searchQuery:null, searchResults:[]}
        default:
            return state;  
    }
}

export default recipesReducer;