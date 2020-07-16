import RecipeActionTypes from './recipes.types';

const INITIAL_STATE={
    recipes:[],     //stores recipes collection  
    loading:true,    //true when recies are being fetched
    recipesError:null,   //contains error message for recipes
    addingRecipe:false, //true when uploading recipe in progress
    userRecipesTitles:[],
    publicRecipesTitles:[],
    fetchingRecipeTitles: false,
    searchQuery:{
        term:null
    },
    searchResults:[],
    recipeDisplayLoading:false,
    recipePageRecipe:null,
    recipePageLoading:false,
    deletingRecipesInProgress:false,
    featuredRecipes:[],
    savingRecipe:null,
    loadingFeaturedRecipes:false
}

const recipesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case RecipeActionTypes.FETCH_RECIPES_START:
            return {...state, loading:true};
        case RecipeActionTypes.FETCH_FEATURED_RECIPES_START:
            return {...state, loadingFeaturedRecipes:true};

        case RecipeActionTypes.FETCH_RECIPE_BY_ID_START:
            return {...state, recipePageLoading:true};

        case RecipeActionTypes.FETCH_SEARCHED_RECIPES_START:
            return {...state, recipeDisplayLoading:true, searchQuery:action.payload};

        case RecipeActionTypes.FETCH_USER_RECIPES_TITLES_START:
            return {...state, fetchingRecipeTitles:true};
        
        case RecipeActionTypes.FETCH_PUBLIC_RECIPES_TITLES_START:
            return {...state, fetchingRecipeTitles:true};

        case RecipeActionTypes.DELETE_RECIPE_START:
            return {...state, deletingRecipesInProgress:true};

        case RecipeActionTypes.FETCH_USER_RECIPES_TITLES_SUCCESS:
            return {...state, userRecipesTitles:action.payload, fetchingRecipeTitles:false};

        case RecipeActionTypes.FETCH_PUBLIC_RECIPES_TITLES_SUCCESS:
            return {...state, publicRecipesTitles:action.payload, fetchingRecipeTitles:false};      

        case RecipeActionTypes.FETCH_SEARCHED_RECIPES_SUCCESS:
            return {...state, searchResults:action.payload, recipeDisplayLoading:false};

        case RecipeActionTypes.UNSAVE_RECIPES_SUCCESS:    
        case RecipeActionTypes.DELETE_RECIPE_SUCCESS:{
            const newRecipesArr=state.recipes.filter(item=>item._id!==action.payload)
            return {...state, recipes: newRecipesArr, deletingRecipesInProgress:false, savingRecipe:null};    
        }
                        
        case RecipeActionTypes.ADD_RECIPES_START:
        case RecipeActionTypes.UPDATE_RECIPE_START:    
            return {...state, addingRecipe:true}

        case RecipeActionTypes.FETCH_RECIPES_SUCCESS:
            return {...state, loading:false, recipes:[...state.recipes , ...action.payload], recipesError:null}; 

        case RecipeActionTypes.FETCH_FEATURED_RECIPES_SUCCESS:
            return {...state, loadingFeaturedRecipes:false, featuredRecipes:action.payload, recipesError:null};     

        case RecipeActionTypes.FETCH_RECIPE_BY_ID_SUCCESS:
            return {...state, recipePageLoading:false, recipePageRecipe:action.payload};
        
        case RecipeActionTypes.SAVE_RECIPES_SUCCESS: 
        case RecipeActionTypes.ADD_RECIPES_SUCCESS: 
            return {...state, addingRecipe:false, recipes:[ action.payload, ...state.recipes,], recipesError:null, savingRecipe:null};
            
        case RecipeActionTypes.UPDATE_RECIPE_SUCCESS:
            {
                const index= state.recipes.map(item=>item._id).indexOf(action.payload._id)
                const updatedRecipes=state.recipes
                updatedRecipes[index]=action.payload
                return {...state, addingRecipe:false, recipes: [...updatedRecipes], loading:false, recipesError:null}
            }    

        case RecipeActionTypes.FETCH_RECIPES_FAILURE:
            return {...state, recipesError:action.payload, loading:false};
        case RecipeActionTypes.FETCH_FEATURED_RECIPES_FAILURE:    
            return {...state, recipesError:action.payload, loadingFeaturedRecipes:false};

        case RecipeActionTypes.ADD_RECIPES_FAILURE:
        case RecipeActionTypes.UPDATE_RECIPE_FAILURE:    
            return {...state, recipesError:action.payload, addingRecipe:false};

        case RecipeActionTypes.FETCH_PUBLIC_RECIPES_TITLES_FAILURE:
            return {...state, recipesError:action.payload, fetchingRecipeTitles:false};   

        case RecipeActionTypes.FETCH_SEARCHED_RECIPES_FAILURE:
            return {...state, recipeDisplayError:action.payload, recipeDisplayLoading:false};

        case RecipeActionTypes.DELETE_RECIPE_FAILURE:
            return {...state, recipesError:action.payload, loading:false};

        case RecipeActionTypes.CLEAR_RECIPES:
            return {...state, recipes:[]};

        case RecipeActionTypes.CLEAR_SEARCH_QUERY:
            return {...state, searchQuery:{term:null}, searchResults:[]}
            
        case RecipeActionTypes.CLEAR_CURRENT_RECIPE:
            return {...state, recipePageRecipe:null }  
        case RecipeActionTypes.SAVE_RECIPES_START:
        case RecipeActionTypes.UNSAVE_RECIPES_START:
            return {...state, savingRecipe:action.payload._id}
        case RecipeActionTypes.UNSAVE_RECIPES_FAILURE:
        case RecipeActionTypes.SAVE_RECIPES_FAILURE:
            return {...state, savingRecipe:null, recipesError:action.payload}
        case RecipeActionTypes.CLEAR_RECIPE_ERROR:
            return {...state, recipesError:null} 
        default:
            return state;  
    }
}

export default recipesReducer;