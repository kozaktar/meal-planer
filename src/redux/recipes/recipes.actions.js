import RecipeActionTypes from './recipes.types';

export const fetchRecipesStart=(user)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPES_START,
        payload:user
    }
);

export const fetchRecipesSuccess=(recipes)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPES_SUCCESS,
        payload:recipes
    }
);

export const fetchRecipesFailure=(error)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPES_FAILURE,
        payload:error
    }
);

export const fetchRecipeByIDStart=(id)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPE_BY_ID_START,
        payload:id
    }
);

export const fetchRecipeByIDSuccess=(recipes)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPE_BY_ID_SUCCESS,
        payload:recipes
    }
);

export const fetchRecipesByIDFailure=(error)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPE_BY_ID_FAILURE,
        payload:error
    }
);
// searchObject={
//    type: public/private
//    term: searchTerm  
//  }
export const fetchSearchedRecipesStart=(searchObject)=>(
    {
        type:RecipeActionTypes.FETCH_SEARCHED_RECIPES_START,
        payload:searchObject
    }
);

export const fetchSearchedRecipesSuccess=(recipes)=>(
    {
        type:RecipeActionTypes.FETCH_SEARCHED_RECIPES_SUCCESS,
        payload:recipes
    }
);

export const fetchSearchedRecipesFailure=(error)=>(
    {
        type:RecipeActionTypes.FETCH_SEARCHED_RECIPES_FAILURE,
        payload:error
    }
);


export const fetchUserRecipeTitlesStart=(user)=>(
    {
        type:RecipeActionTypes.FETCH_USER_RECIPES_TITLES_START,
        payload:user
    }
);

export const fetchUserRecipeTitlesSuccess=(titles)=>(
    {
        type:RecipeActionTypes.FETCH_USER_RECIPES_TITLES_SUCCESS,
        payload:titles
    }
);

export const fetchRecipeTitlesFailure=(error)=>(
    {
        type:RecipeActionTypes.FETCH_RECIPES_TITLES_FAILURE,
        payload:error
    }
);

export const addRecipeStart=(recipe)=>(
    {
        type:RecipeActionTypes.ADD_RECIPES_START,
        payload:recipe
    }
);

export const addRecipeSuccess=(recipe)=>(
    {
        type:RecipeActionTypes.ADD_RECIPES_SUCCESS,
        payload:recipe
    }
);

export const addRecipesFailure=(error)=>(
    {
        type:RecipeActionTypes.ADD_RECIPES_FAILURE,
        payload:error
    }
);

export const clearRecipes=()=>(
    {
        type:RecipeActionTypes.CLEAR_RECIPES
    }
);

export const clearSearchQuery=()=>(
    {
        type:RecipeActionTypes.CLEAR_SEARCH_QUERY
    }
);

export const deleteRecipeStart=(recipeID)=>(
    {
        type:RecipeActionTypes.DELETE_RECIPE_START,
        payload:recipeID
    }
);

export const deleteRecipeSuccess=(recipeID)=>(
    {
        type:RecipeActionTypes.DELETE_RECIPE_SUCCESS,
        payload:recipeID
    }
);

export const deleteRecipeFailure=(error)=>(
    {
        type:RecipeActionTypes.DELETE_RECIPE_FAILURE,
        payload:error
    }
);

export const clearCurrentRecipe=()=>(
    {
        type:RecipeActionTypes.CLEAR_CURRENT_RECIPE
    }
)

export const updateRecipeStart=(recipe)=>(
    {
        type:RecipeActionTypes.UPDATE_RECIPE_START,
        payload:recipe
    }
);

export const updateRecipeSuccess=(recipe)=>(
    {
        type:RecipeActionTypes.UPDATE_RECIPE_SUCCESS,
        payload:recipe
    }
);

export const updateRecipesFailure=(error)=>(
    {
        type:RecipeActionTypes.UPDATE_RECIPE_FAILURE,
        payload:error
    }
);

export const fetchPublicRecipeTitlesStart=()=>(
    {
        type:RecipeActionTypes.FETCH_PUBLIC_RECIPES_TITLES_START
    }
);

export const fetchPublicRecipeTitlesSuccess=(titles)=>(
    {
        type:RecipeActionTypes.FETCH_PUBLIC_RECIPES_TITLES_SUCCESS,
        payload:titles
    }
);


export const fetchFeaturedRecipesStart=(num)=>(
    {
        type:RecipeActionTypes.FETCH_FEATURED_RECIPES_START,
        payload:num
    }
);

export const fetchFeaturedRecipesSuccess=(recipes)=>(
    {
        type:RecipeActionTypes.FETCH_FEATURED_RECIPES_SUCCESS,
        payload:recipes
    }
);

export const fetchFeaturedRecipesFailure=(error)=>(
    {
        type:RecipeActionTypes.FETCH_FEATURED_RECIPES_FAILURE,
        payload:error
    }
);

export const saveRecipeStart=(id)=>(
    {
        type:RecipeActionTypes.SAVE_RECIPES_START,
        payload:id
    }
);

export const saveRecipeSuccess=(recipe)=>(
    {
        type:RecipeActionTypes.SAVE_RECIPES_SUCCESS,
        payload:recipe
    }
);

export const saveRecipeFailure=(error)=>(
    {
        type:RecipeActionTypes.SAVE_RECIPES_FAILURE,
        payload:error
    }
);

export const unsaveRecipeStart=(id)=>(
    {
        type:RecipeActionTypes.UNSAVE_RECIPES_START,
        payload:id
    }
);

export const unsaveRecipeSuccess=(recipe)=>(
    {
        type:RecipeActionTypes.UNSAVE_RECIPES_SUCCESS,
        payload:recipe
    }
);

export const unsaveRecipeFailure=(error)=>(
    {
        type:RecipeActionTypes.UNSAVE_RECIPES_FAILURE,
        payload:error
    }
);

export const clearRecipeError=()=>(
    {
        type:RecipeActionTypes.CLEAR_RECIPE_ERROR,
    }
);
