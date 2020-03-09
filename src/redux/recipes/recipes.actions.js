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