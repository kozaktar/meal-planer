import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import {toggleAddRecipeDropdown} from '../../redux/addRecipeModal/addRecipeModal.actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    addButton:{
      '&:hover': {
        backgroundColor: 'transparent',
        color:'black'

     }
    }
      
  }));

//used to open edit recipe dialog
export const EditRecipeButton=({openEditModal, disabled})=>{

    const classes=useStyles();

    return(
    <IconButton aria-label="edit" size='medium' onClick={openEditModal} className={classes.addButton} disableTouchRipple disabled={disabled}>
        <span style={{fontSize:'14px', marginRight:'2px'}}>Edit Recipe</span> <EditIcon fontSize='default'/>
    </IconButton>
    )
}

const mapDispatchToProps=dispatch=>(
    {
        openEditModal: ()=>dispatch(toggleAddRecipeDropdown())
    }
)

export default connect(null, mapDispatchToProps)(EditRecipeButton);