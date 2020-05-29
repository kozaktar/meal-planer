import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import {fetchRecipeByIDStart} from '../../redux/recipes/recipes.actions';
import {toggleAddRecipeDropdown} from '../../redux/addRecipeModal/addRecipeModal.actions'

const EditRecipeButton=({id, fetchRecipeInfo, openEditModal})=>{

    const handleClick=()=>{
        fetchRecipeInfo(id)
        openEditModal()
    }

    return(
    <IconButton aria-label="delete" size='small' onClick={handleClick}>
        <EditIcon fontSize='small'/>
    </IconButton>
    )
}

const mapDispatchToProps=dispatch=>(
    {
        fetchRecipeInfo: (id)=>dispatch(fetchRecipeByIDStart(id)),
        openEditModal: ()=>dispatch(toggleAddRecipeDropdown())
    }
)

export default connect(null, mapDispatchToProps)(EditRecipeButton);