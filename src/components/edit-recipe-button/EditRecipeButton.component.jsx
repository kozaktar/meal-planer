import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import {toggleAddRecipeDropdown} from '../../redux/addRecipeModal/addRecipeModal.actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    addButton:{
      '&:hover': {
        backgroundColor: 'transparent'
     }
    }
      
  }));

const EditRecipeButton=({openEditModal, disabled})=>{

    const classes=useStyles();

    const handleClick=()=>{
        openEditModal()
    }

    return(
    <IconButton aria-label="delete" size='medium' onClick={handleClick} className={classes.addButton} disableTouchRipple disabled={disabled}>
        <span style={{fontSize:'14px', marginRight:'2px'}}>Edit Recipe</span> <EditIcon fontSize='medium'/>
    </IconButton>
    )
}

const mapDispatchToProps=dispatch=>(
    {
        openEditModal: ()=>dispatch(toggleAddRecipeDropdown())
    }
)

export default connect(null, mapDispatchToProps)(EditRecipeButton);