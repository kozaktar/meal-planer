import React, {useReducer} from 'react';
import ImageUpload from '../image-upload/ImageUpload.component'
import RecipeInputTabs from '../recipeInputTabs/recipeInputTabs.component'
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {addRecipeStart, updateRecipeStart} from '../../redux/recipes/recipes.actions'
import toggleAddRecipeDropdown from '../../redux/addRecipeModal/addRecipeModal.actions';
import {selectRecipeAddingProgress, selectAddRecipeError} from '../../redux/recipes/recipes.selectors';
import {selectAdd_Recipe_Modal_Visible} from '../../redux/addRecipeModal/addRecipeModal.selectors'
import WithSpinner from '../spiner/withSpiner.component';
import recipeFormReducer from './addRecipeFormReducer';
import {updateTitle, updateDescription, updateDirections, updateIngredients, updatePortions,updatePrepTime, updateVisibility, removeDirections, removeImage, removeIngredients, addDirections, addImage, addIngredients} from './addRecipeFormActions';

const ButtonWithSpinner=WithSpinner(Button);

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexDirection:'row',
    margin:30,
    height:'100%',
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column',
      margin:'auto'
    }
  },
  form:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    height:'100%'
  },
  buttonsGroup:{
    margin:30,
    paddingBottom:20
  },
  cancelButton:{
    backgroundColor:'transparent',
    color:'grey',
    boxShadow: 'none',
    "&:hover": {
      backgroundColor:'transparent',
      boxShadow:'none',
      color:'black'
  }
}
}));



const AddRecipeForm=({currentUser, addRecipe, addingRecipeLoad, recipeError,toggleAddRecipeDropdown, recipe, updateRecipe}) =>{

//initial state for useReducer
  const initialState={
    img:null,
    title:'',
    description:'',
    portions:1,
    prepTime:'',
    ingredients:[''],
    directions:[''],
    visibility:'public'
  }

//if component received recipe as prop then fill in initial values from the recipe object [used in recipe eddit case] otherwise use inital values [add new recipe case]  
  if(recipe){
    initialState.img=recipe.picture
    initialState.title=recipe.recipeTitle
    initialState.description=recipe.recipeDescription
    initialState.ingredients=recipe.recipeIngredients
    initialState.directions=recipe.recipeDirections
    initialState.visibility=recipe.visibility
    initialState.portions=recipe.portions
    initialState.prepTime=recipe.prepTime
  }

  const [state, dispatch]= useReducer(recipeFormReducer, initialState)
 
  const removeImages=()=>dispatch(removeImage());

//image upload handle  
  const handleDrop=(acceptedFiles)=>{
    dispatch(addImage(acceptedFiles[0]))
  }

  const handleFormChange=event=>{
    const { value, name } = event.target;

    switch(name){
      case 'title':
        dispatch(updateTitle(value))
        break;
      case 'description':
          dispatch(updateDescription(value))
          break;
      case 'portions':
          dispatch(updatePortions(value))
          break;              
      case 'directions':
          dispatch(updateDirections(value,event.target.id.replace('directions-','')))    
          break;
      case 'ingredients':
          dispatch(updateIngredients(value,event.target.id.replace('ingredient-','')))   
          break; 
      case 'prepTime':
        dispatch(updatePrepTime(value))
          break;
      case 'visibility':
        dispatch(updateVisibility(value))
          break;           
      default:
        console.log('reducer error')
        break;
    }
  }


  const handleSubmit=()=>{
    //updated recipe to submit
    const recipeToSubmit={
    'recipeTitle':state.title,
    'recipeDescription':state.description,
    'recipeIngredients':state.ingredients,
    'recipeDirections':state.directions,
    'visibility':state.visibility,
    'picture':state.img,
    'author':currentUser.displayName,
    'portions':state.portions,
    'prepTime':state.prepTime
  }

  //if recipe object was not passed in props [add new recipe case]
    if(!recipe)
      addRecipe(recipeToSubmit)
    else{
      //edit recipe case
      const updates={}
      updates._id=recipe._id
      for(const prop in recipeToSubmit){
        if(recipe[prop]!==recipeToSubmit[prop]){
          updates[prop]=recipeToSubmit[prop]
        }
      }
      updateRecipe(updates)
    }
      
  }

    const classes=useStyles();
    return (
     <div className={classes.root}>
      <ImageUpload onDrop={handleDrop} removeImages={removeImages} initialImage={state.img}/>
      <div className={classes.form}>
      <RecipeInputTabs onFormChange={handleFormChange} state={state} addDirections={()=>dispatch(addDirections())} deleteDirections={(value)=>dispatch(removeDirections(value))} addIngredient={()=>dispatch(addIngredients())} deleteIngredient={(value)=>dispatch(removeIngredients(value))}/>
     <div className={classes.buttonsGroup}>
     <ButtonWithSpinner isloading={addingRecipeLoad} variant="contained" size="large" color="primary" className={classes.margin} onClick={handleSubmit}>
          {recipe?"Update recipe":"Add recipe"}
      </ButtonWithSpinner>
      <Button variant="contained" size="large" className={classes.cancelButton} onClick={()=>toggleAddRecipeDropdown()}>
          Cancel
      </Button>
     </div>
    </div>
     </div>
    
    );
  }

  const mapStateToProps = createStructuredSelector(
    {
      currentUser: selectCurrentUser,
      addingRecipeLoad: selectRecipeAddingProgress,
      recipeError: selectAddRecipeError,
      addRecipeDropdownVisible: selectAdd_Recipe_Modal_Visible
    }
  )

  const mapDispatchToProps = dispatch => (
    {
      addRecipe: (recipe)=>dispatch(addRecipeStart(recipe)),
      toggleAddRecipeDropdown:()=>dispatch(toggleAddRecipeDropdown()),
      updateRecipe:(recipe)=>dispatch(updateRecipeStart(recipe))
    }
  )

  export default connect(mapStateToProps,mapDispatchToProps)(AddRecipeForm);
