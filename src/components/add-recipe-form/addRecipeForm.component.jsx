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
import {selectRecipeAddingProgress, selectAddRecipeError, selectCurrentRecipe } from '../../redux/recipes/recipes.selectors';
import {selectAdd_Recipe_Modal_Visible} from '../../redux/addRecipeModal/addRecipeModal.selectors'
import WithSpinner from '../spiner/withSpiner.component';
import ErrorMessage from '../error-message/error-message';

const ButtonWithSpinner=WithSpinner(Button);

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexDirection:'row',
    margin:30,
    height:'100%',
  },
  form:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    height:'100%'
  },
  buttonsGroup:{
    margin:30
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



const reducer=(state,action)=>{
  switch(action.type){
    case 'updateTitle':
      return {...state, title:action.payload};
    case 'updateDescription':
      return {...state, description:action.payload};
    case 'updatePortions':
      return {...state, portions:action.payload};
    case 'updatePrepTime':
      return {...state, prepTime:action.payload};  
    case 'updateIngredients':
      const updatedIngredients=[...state.ingredients]
      updatedIngredients[action.idx]=action.payload;
      return {...state, ingredients:updatedIngredients};
    case 'updateDirections':
      const updatedDirections=[...state.directions]
      updatedDirections[action.idx]=action.payload;
      return {...state, directions:updatedDirections};
    case 'addDirections':
        return {...state, directions:[...state.directions,'']};
    case 'removeDirections':
        const directionsPostDeletion=[...state.directions];
        directionsPostDeletion.splice(action.idx, 1);
        return {...state, directions:directionsPostDeletion};  
    case 'addIngredients':
        return {...state, ingredients:[...state.ingredients,'']};
    case 'removeIngredients':
        const ingredientsPostDeletion=[...state.ingredients];
        ingredientsPostDeletion.splice(action.idx,1);
        return {...state, ingredients:ingredientsPostDeletion};
    case 'addImage':
        return {...state, img:action.payload};
    case 'removeImage':
      return {...state, img:null};
    default:
       return state;
  }
}

const updateTitle=(payload)=>(
  {
    type:'updateTitle',
    payload
  }
)

const updateDescription=(payload)=>(
  {
    type:'updateDescription',
    payload
  }
)

const updatePortions=(payload)=>(
  {
    type:'updatePortions',
    payload
  }
)

const updatePrepTime=(payload)=>(
  {
    type:'updatePrepTime',
    payload
  }
)

const updateDirections=(payload, idx)=>(
  {
    type:'updateDirections',
    payload,
    idx
  }
)

const addDirections=()=>(
  {
    type:'addDirections'
  }  
)

const removeDirections=(idx)=>{
  
  return (
  {
    type:'removeDirections',
    payload:idx
  }
)}
const updateIngredients=(payload, idx)=>(
  {
    type:'updateIngredients',
    payload,
    idx
  }
)

const removeIngredients=(idx)=>{
  return (
  {
    type:'removeIngredients',
    payload:idx
  }
)}

const addIngredients=()=>(
  {
    type:'addIngredients'
  }  
)

const addImage=(image)=>(
  {
    type:'addImage',
    payload:image
  }  
)

const removeImage=()=>(
  {
    type:'removeImage'
  }  
)


const AddRecipeForm=({currentUser, addRecipe, addingRecipeLoad, recipeError,toggleAddRecipeDropdown, recipe, updateRecipe}) =>{


  const initialState={
    img:null,
    title:'',
    description:'',
    portions:1,
    prepTime:'',
    ingredients:[''],
    directions:[''],
    visibility:true
  }

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

  const [state, dispatch]= useReducer(reducer, initialState)
 
  const removeImages=()=>dispatch(removeImage());

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
      case 'portions':
          dispatch(updatePortions(value))
          break;              
      case 'directions':
          dispatch(updateDirections(value,event.target.id.replace('directions-','')))    
          break;
      case 'ingredients':
          dispatch(updateIngredients(value,event.target.id.replace('ingredient-','')))   
          break;
      case 'portions':
          dispatch(updatePortions(value))
          break; 
      case 'prepTime':
        dispatch(updatePrepTime(value))
          break;           
      default:
        console.log('reducer error')
        break;
    }
  }

  const handleSubmit=()=>{
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

    if(!recipe)
      addRecipe(recipeToSubmit)
    else{
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
       <ErrorMessage>{recipeError}</ErrorMessage>
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
      addRecipeDropdownVisible: selectAdd_Recipe_Modal_Visible,
      recipe: selectCurrentRecipe
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
