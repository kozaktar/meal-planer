import AddRecipeModalTypes from './addRecipeModal.types'
const INITIAL_STATE={
    add_recipe_modal_visible:false
}

const AddRecipeModalReduce=(state=INITIAL_STATE, action)=>{
    switch(action.type){
        case AddRecipeModalTypes.TOGGLE_ADDRECIPE_DROPDOWN:
            return {...state, add_recipe_modal_visible:!state.add_recipe_modal_visible};
        default:
            return state
    }
}

export default AddRecipeModalReduce;