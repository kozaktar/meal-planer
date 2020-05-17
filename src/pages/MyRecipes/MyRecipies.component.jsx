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
import {selectAdd_Recipe_Modal_Visible} from '../../redux/addRecipeModal/addRecipeModal.selectors';
import toggleAddRecipeDropdown from '../../redux/addRecipeModal/addRecipeModal.actions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    [theme.breakpoints.down('sm')]:{
      marginLeft:'-5px'
    }
  },
    addIcon:{
      fontSize:  40,
      [theme.breakpoints.down('sm')]:{
      fontSize: 35
    }
  }
    
}));

const MyRecipies =({recipes, addRecipeVisible,toggleAddRecipeDropdown})=>{

const classes=useStyles();

return(
  <div className={classes.root}>
      <Grid container spacing={1}>
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
          <IconButton className={classes.addButton} onClick={()=>toggleAddRecipeDropdown()}>
             <AddCircleIcon color="primary" className={classes.addIcon}/>
          </IconButton>

          <Modal title="Add New Recipe" handleClose={toggleAddRecipeDropdown} open={addRecipeVisible}>
            <AddRecipeForm onClose={toggleAddRecipeDropdown}/>
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
    getRecipes: (user)=>dispatch(fetchRecipesStart(user)),
    toggleAddRecipeDropdown: ()=>dispatch(toggleAddRecipeDropdown())
  }
)

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipes: selectUserRecipes,
    addRecipeVisible: selectAdd_Recipe_Modal_Visible
})

export default connect(mapStateToProps,mapDispatchToProps)(MyRecipies);