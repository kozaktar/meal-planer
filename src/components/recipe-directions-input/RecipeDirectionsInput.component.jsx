import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
    header: {
      display:'flex',
      justifyContent:'space-between',
      margin:0
    }
  }));

const RecipeDirectionsInput=({ idx, handleChange, deleteDirections, state})=>{

    const classes=useStyles();
   return (
   <div>
        <div className={classes.header}>
            <Typography variant='h6' style={{marginBottom:'0',padding:0}}>{`Step ${idx+1}:`}</Typography>
            <Tooltip title={`Delete Step ${idx+1}`}>
            <IconButton aria-label="delete" onClick={()=>{deleteDirections(`${idx}`)}}>
            <DeleteIcon fontSize="small"/>
            </IconButton>
            </Tooltip>
        </div>
            <TextField
            fullWidth
            id={`directions-${idx}`}
            name="directions"
            multiline
            value={state.directions[idx]}
            rowsMax="5"
            margin="normal"
            onChange={handleChange}

            />
    </div>
   )
    }

export default RecipeDirectionsInput;