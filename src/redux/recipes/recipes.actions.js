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