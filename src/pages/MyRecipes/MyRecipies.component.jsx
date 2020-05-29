import React from 'react';
import SearchBar from '../../components/search-bar/SearchBar.component'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '../../components/modal/modal.component';
import AddRecipeForm from '../../components/add-recipe-form/addRecipeForm.component'
import {connect} from 'react-redux';
import {fetchRecipesStart, clearCurrentRecipe} from '../../redux/recipes/recipes.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectUserRecipes, selectSearchResults, selectRecipePageLoading } from './../../redux/recipes/recipes.selectors';
import {selectAdd_Recipe_Modal_Visible} from '../../redux/addRecipeModal/addRecipeModal.selectors';
import toggleAddRecipeDropdown from '../../redux/addRecipeModal/addRecipeModal.actions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import RecipeDisplay from '../../components/recipeDisplay/RecipeDisplay.component';
import WithSpinner from '../../components/spiner/withSpiner.component'

const AddRecipeFormWithSpinner=WithSpinner(AddRecipeForm);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginRight:'10px',
    maxWidth: '92vw',
    marginLeft:'60px',
    textAlign:'center'
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
    justifyContent: 'center'
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

const MyRecipies =({ addRecipeVisible,toggleAddRecipeDropdown, clearRecipe, loadingRecipeInfo})=>{

const classes=useStyles();

const handleAddRecipeButtonClick=()=>{
  clearRecipe();
  toggleAddRecipeDropdown();
}

return(
  <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.alignItemsAndJustifyContent}>
          <SearchBar/>
          {/* <Button
          variant="contained"
          color="primary"
          size="large"
          style={{marginLeft:'2vw'}}
          onClick={()=>toggleAddRecipeDropdown()}
          >
            Add Recipe 
          </Button> */}
          <IconButton className={classes.addButton} onClick={()=>handleAddRecipeButtonClick()} >
             <AddCircleIcon color="primary" className={classes.addIcon}/>
          </IconButton>

          <Modal title="Add New Recipe" handleClose={toggleAddRecipeDropdown} open={addRecipeVisible}>
            <AddRecipeFormWithSpinner isloading={loadingRecipeInfo} onClose={toggleAddRecipeDropdown}/>
          </Modal>
        </Grid>
        <RecipeDisplay/>
        
      </Grid>
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
    loadingRecipeInfo: selectRecipePageLoading
})

export default connect(mapStateToProps,mapDispatchToProps)(MyRecipies);