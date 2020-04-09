import {createSelector} from 'reselect';

const selectAddRecipeDropDown=state=>state.addRecipeModal;

export const selectAdd_Recipe_Modal_Visible=createSelector(
    [selectAddRecipeDropDown],
    addRecipeModal=>addRecipeModal.add_recipe_modal_visible
)