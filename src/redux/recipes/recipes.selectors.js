import {createSelector} from 'reselect';

const selectRecipes=state=>state.recipes;

export const selectRecipeError=createSelector(
    [selectRecipes],
    recipes=>recipes.recipesError
);

export const selectRecipeLoading=createSelector(
    [selectRecipes],
    recipes=>recipes.loading
);

export const selectRecipeAddingProgress=createSelector(
    [selectRecipes],
    recipes=>recipes.addingRecipe
);

export const selectAddRecipeError=createSelector(
    [selectRecipes],
    recipes=>recipes.addingRecipeError
);