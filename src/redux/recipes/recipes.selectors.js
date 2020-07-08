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

export const selectUserRecipes=createSelector(
    [selectRecipes],
    recipes=>recipes.recipes
)

export const selectUserRecipesTitles=createSelector(
    [selectRecipes],
    recipes=>recipes.userRecipesTitles
)

export const selectSearchResults=createSelector(
    [selectRecipes],
    recipes=>recipes.searchResults
)

export const selectSearchLoading=createSelector(
    [selectRecipes],
    recipes=>recipes.recipeSearching
);

export const selectCurrentRecipe=createSelector(
    [selectRecipes],
    recipes=>recipes.recipePageRecipe
);

export const selectFeaturedRecipe=createSelector(
    [selectRecipes],
    recipes=>recipes.featuredRecipes
);

export const selectRecipePageLoading=createSelector(
    [selectRecipes],
    recipes=>recipes.recipePageLoading
);


export const selectSearchQuery=createSelector(
    [selectRecipes],
    recipes=>recipes.searchQuery
);

export const selectSavingRecipe=createSelector(
    [selectRecipes],
    recipes=>recipes.savingRecipe
);