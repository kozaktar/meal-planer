import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    header: {
      display:'flex',
      justifyContent:'space-between'
    }
  }));

const RecipeIngredientsInput=({ idx, handleChange, deleteIngredient, state})=>{

    const classes=useStyles();
   return (
   <div>
        <div className={classes.header}>
            <Typography variant='h6'>{`Ingredient ${idx+1}:`}</Typography>
            <Tooltip title={`Delete Ingredient ${idx+1}`}>
            <IconButton aria-label="delete" onClick={()=>deleteIngredient(idx)}>
            <DeleteIcon fontSize="small"/>
            </IconButton>
            </Tooltip>
        </div>
            <TextField
            fullWidth
            id={`ingredient-${idx}`}
            name="ingredients"
            value={state.ingredients[idx]}
            margin="normal"
            onChange={handleChange}
            />
    </div>
   )
    }

export default RecipeIngredientsInput;