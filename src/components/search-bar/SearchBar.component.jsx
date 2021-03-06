import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectUserRecipesTitles, selectPublicRecipesTitles} from '../../redux/recipes/recipes.selectors'
import {fetchSearchedRecipesStart, clearSearchQuery} from './../../redux/recipes/recipes.actions';
import {withRouter} from 'react-router-dom';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {selectFetchingRecipeTitles} from '../../redux/recipes/recipes.selectors';



const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width:'50vw',
      border:'1px solid grey',
      [theme.breakpoints.down('xs')]:{
        minWidth:'75vw',
        maxWidth:'80vw',
        marginLeft:'auto'
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
    textField: {
      
    }
    
  }));

const SearchBar=({userRecipeTitles, publicRecipeTitles, searchStart, clearSearch, titlesLoading, type, location})=>{
    const classes = useStyles();
    let recipeTitles=null;
    const currentPath=location.pathname;

    

    useEffect(()=>{
      clearSearch()
    }, [currentPath, clearSearch])

    if(type==='public'){
      recipeTitles=publicRecipeTitles
    }
    else{
      recipeTitles=userRecipeTitles
    }
    const [searchQuery, setSearchQuery]= useState('');
    const [textFieldValue, settextFieldValue]= useState(null);
    

    const handleSubmit=(event)=>{
      event.preventDefault();

      const searchObject={type, term:searchQuery}
      searchStart(searchObject);
    }


    const handleChange=(event, newValue)=>{
      setSearchQuery(newValue)
      if(newValue && newValue.length>0){
        const searchObject={type, term:newValue}
        searchStart(searchObject);
      }
    }


    const textFieldChange=(event)=>{
      settextFieldValue(event.target.value)
    }

        return(
          <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
              <SearchIcon style={{marginLeft:"10px", color:'grey'}}/>
              
              <Autocomplete
                value={searchQuery}
                onChange={handleChange}
                className={classes.input}
                selectOnFocus
                clearOnBlur
                id="free-solo"
                freeSolo
                options={textFieldValue && !titlesLoading ? recipeTitles.map((option) => option.recipeTitle):[]}
                renderInput={(params) => (
                  <TextField {...params}
                  placeholder={type==='public'?"Search Recipes":"Search Your Recipes"}
                  onChange={textFieldChange}
                  margin="none"
                  id='searchValue'
                  InputProps={{ ...params.InputProps, disableUnderline: true,
                  endAdornment: (
                    <React.Fragment>
                      {titlesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}
                  
                />
        )}
      />            
          </Paper>
               </form>
        )
}

const mapStateToProps=createStructuredSelector(
  {
    userRecipeTitles:selectUserRecipesTitles,
    publicRecipeTitles:selectPublicRecipesTitles,
    currentUser:selectCurrentUser,
    titlesLoading:selectFetchingRecipeTitles
  }
)

const mapDispatchToProps=dispatch=>(
  {
  searchStart:(searchString)=>dispatch(fetchSearchedRecipesStart(searchString)),
  clearSearch:()=>dispatch(clearSearchQuery())
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar))