import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {deleteRecipeStart} from '../../redux/recipes/recipes.actions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DeleteRecipeButton=({id, deleteRecipe, style})=>{

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleDeleteButtonClick=()=>{
        deleteRecipe(id)
        handleClose()
    }

    return (
        <>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title: Delete Recipe">Delete this recipe?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This recipe will be deleted from your recipe box. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteButtonClick} color="primary">
            Ok
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        <IconButton aria-label="delete" onClick={handleClickOpen} size='small' style={style}>
             <DeleteIcon fontSize='small'/>
        </IconButton>
        </>
    )
}

const mapDispatchToProps=dispatch=>(
    {
        deleteRecipe: (recipeId)=>dispatch(deleteRecipeStart(recipeId))
    }
)
export default connect(null, mapDispatchToProps)(DeleteRecipeButton)