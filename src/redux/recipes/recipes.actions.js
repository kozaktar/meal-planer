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
        type:RecipeActionTypes.FETCH_RECIPES_SUCCESS,
        payload:error
    }
);

export const fetchSearchedRecipesStart=(user)=>(
    {
        type:RecipeActionTypes.FETCH_SEARCHED_RECIPES_START,
        payload:user
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

export const fetchUserRecipeTitlesFailure=(error)=>(
    {
        type:RecipeActionTypes.FETCH_USER_RECIPES_TITLES_FAILURE,
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