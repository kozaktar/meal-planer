import React from 'react';
import SearchBar from '../../components/search-bar/SearchBar.component'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '../../components/modal/modal.component';
import AddRecipeForm from '../../components/add-recipe-form/addRecipeForm.component'
import {connect} from 'react-redux';
import {fetchRecipesStart} from '../../redux/recipes/recipes.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectUserRecipes } from './../../redux/recipes/recipes.selectors';
import RecipeCard from '../../components/recipe-card/RecipeCard';
import Button from '@material-ui/core/Button';
import {selectRecipeAddingProgress, selectAddRecipeError } from '../../redux/recipes/recipes.selectors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginRight:'10px',
    maxWidth: '92vw',
    marginLeft:'50px',
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
    display:'block',
    margin:'auto',
    marginTop:70
  }
}));

const MyRecipies =({recipes, addingRecipeLoad, recipeError})=>{

    
const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

const classes=useStyles();

return(
  <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.alignItemsAndJustifyContent}>
          <SearchBar/>
          <Button
          variant="contained"
          color="primary"
          size="large"
          style={{marginLeft:'2vw'}}
          onClick={handleOpen}
          >
            Add Recipe 
          </Button>
          <Modal title="Add New Recipe" handleClose={handleClose} open={open}>
            <AddRecipeForm onClose={handleClose}/>
          </Modal>
        </Grid>
        
        { recipes.map(item=>(<Grid item key={item._id}>
            <RecipeCard recipe={item}/>
          </Grid>)
        )}
        
      </Grid>
  </div>
        )
    
}

const mapDispatchToProps = dispatch => (
  {
    getRecipes: (user)=>dispatch(fetchRecipesStart(user))
  }
)

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipes: selectUserRecipes,
    addingRecipeLoad: selectRecipeAddingProgress,
    recipeError: selectAddRecipeError
})

export default connect(mapStateToProps,mapDispatchToProps)(MyRecipies);