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
import {fetchSearchedRecipesStart} from './../../redux/recipes/recipes.actions';

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
      padding: 5,
    },
    
  }));

const SearchBar=({recipeTitles, searchStart})=>{
    const classes = useStyles();

    const [searchQuery, setSearchQuery]= useState('');
    const [textFieldValue, settextFieldValue]= useState(null);

    const handleSubmit=(event)=>{
      event.preventDefault();
      searchStart(searchQuery);
    }


    const handleChange=(event, newValue)=>{
        setSearchQuery(newValue)
        console.log('auto change')
    }

    const textFieldChange=(event)=>{
      settextFieldValue(event.target.value)
      console.log('txt change')
    }

        return(
          <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
              <SearchIcon style={{marginLeft:"10px", color:'grey'}}/>
              
              <Autocomplete
                value={searchQuery}
                onChange={handleChange}
                className={classes.input}
                id="free-solo-demo"
                freeSolo
                options={textFieldValue?recipeTitles.map((option) => option.recipeTitle):[]}
                renderInput={(params) => (
                  <TextField {...params}
                  placeholder="Search Recipes"
                  onChange={textFieldChange}
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

const mapDispatchToProps=dispatch=>(
  {
  searchStart:(searchString)=>dispatch(fetchSearchedRecipesStart(searchString))
}
)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)