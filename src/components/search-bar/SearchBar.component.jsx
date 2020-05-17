import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectUserRecipesTitles} from '../../redux/recipes/recipes.selectors'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width:'50vw',
      border:'1px solid grey',
      [theme.breakpoints.down('sm')]:{
        width:'65vw',
        marginLeft:'30px'
      }
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      padding:'6px'
    },
    iconButton: {
      padding: 10,
    },
    
  }));

const SearchBar=({recipeTitles})=>{
    const classes = useStyles();

    const [searchQuery, setSearchQuery]= useState('');

    const handleSubmit=(event)=>{
      event.preventDefault();
      console.log('query', )
    }


    const handleChange=(event)=>{
      setSearchQuery(event.target.value)
    }

        return(
          <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
              <SearchIcon style={{marginLeft:"10px", color:'grey'}}/>
              
              <Autocomplete
                className={classes.input}
                id="free-solo-demo"
                freeSolo
                options={searchQuery.length>0?recipeTitles.map((option) => option.recipeTitle):[]}
                renderInput={(params) => (
                  <TextField {...params}
                  onChange={handleChange}
                  placeholder="Search Recipes"
                  margin="none"
                  id='searchValue'
                  InputProps={{ ...params.InputProps, type: 'search', disableUnderline: true}}
                  
                />
        )}
      />            
          </Paper>
               </form>
        )
}

const mapStateToProps=createStructuredSelector(
  {
    recipeTitles:selectUserRecipesTitles
  }
)

export default connect(mapStateToProps)(SearchBar)