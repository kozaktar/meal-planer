import React from 'react';
import SearchBar from '../../components/search-bar/SearchBar.component'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../../components/modal/modal.component';
import AddRecipeForm from '../../components/add-recipe-form/addRecipeForm.component'
import {connect} from 'react-redux';
import {fetchRecipesStart, clearCurrentRecipe} from '../../redux/recipes/recipes.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectUserRecipes, selectSearchResults, selectRecipePageLoading, selectCurrentRecipe } from './../../redux/recipes/recipes.selectors';
import {selectAdd_Recipe_Modal_Visible} from '../../redux/addRecipeModal/addRecipeModal.selectors';
import toggleAddRecipeDropdown from '../../redux/addRecipeModal/addRecipeModal.actions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import RecipeDisplay from '../../components/recipeDisplay/RecipeDisplay.component';
import WithSpinner from '../../components/spiner/withSpiner.component';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const ModalWithSpinner=WithSpinner(Modal);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginRight:'10px',
    maxWidth: '92vw',
    marginLeft:'60px',
    textAlign:'center',
    [theme.breakpoints.down('sm')]:{
      marginRight:'auto',
      marginLeft:'-5px'
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  alignItemsAndJustifyContent: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  card:{
    maxWidth: 345,
    height:200,
    border:'dashed 3px #E0E0E0'
  },
  addButton:{
    '&:hover': {
      backgroundColor: 'transparent'
   },
    [theme.breakpoints.down('sm')]:{
      marginLeft:'-10px',
      
    }
  },
    addIcon:{
      fontSize:  40,
      [theme.breakpoints.down('sm')]:{
      fontSize: 35
    }
  }
    
}));

const MyRecipies =({ addRecipeVisible,toggleAddRecipeDropdown, clearRecipe, loadingRecipeInfo, currentRecipe, recipes})=>{

const classes=useStyles();

const handleAddRecipeButtonClick=()=>{
  clearRecipe();
  toggleAddRecipeDropdown();
}

const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('sm'));


return(
  <div className={classes.root}>
      
        <div className={classes.alignItemsAndJustifyContent}>
          <SearchBar type='private'/>
          <Button
          variant="contained"
          color="primary"
          size={matches?'small':'large'}
          style={{marginLeft:'1vw'}}
          onClick={()=>handleAddRecipeButtonClick()}
          >
            Add Recipe 
          </Button> 
          {/* <Tooltip title='Add Recipe'>
          <IconButton className={classes.addButton} onClick={()=>handleAddRecipeButtonClick()} >
             <AddCircleIcon color="primary" className={classes.addIcon}/>
          </IconButton>
          </Tooltip> */}

          <ModalWithSpinner title={currentRecipe?"Edit Recipe":"Add New Recipe"} handleClose={toggleAddRecipeDropdown} open={addRecipeVisible} isloading={loadingRecipeInfo}>
            <AddRecipeForm onClose={toggleAddRecipeDropdown}/>
          </ModalWithSpinner>
        </div>
        <div style={{marginTop:30}}>
        <RecipeDisplay recipes={recipes}/>
        </div>
  </div>
        )
    
}

const mapDispatchToProps = dispatch => (
  {
    getRecipes: (user)=>dispatch(fetchRecipesStart(user)),
    toggleAddRecipeDropdown: ()=>dispatch(toggleAddRecipeDropdown()),
    clearRecipe: ()=>dispatch(clearCurrentRecipe())
  }
)

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipes: selectUserRecipes,
    addRecipeVisible: selectAdd_Recipe_Modal_Visible,
    searchResults: selectSearchResults,
    loadingRecipeInfo: selectRecipePageLoading,
    currentRecipe: selectCurrentRecipe
})

export default connect(mapStateToProps,mapDispatchToProps)(MyRecipies);