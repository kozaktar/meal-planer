import React, { Fragment, useState, useReducer} from 'react';
import ImageUpload from '../image-upload/ImageUpload.component'
import RecipeInputTabs from '../recipeInputTabs/recipeInputTabs.component'
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';



const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexDirection:'row',
    margin:30,
    height:'100%'
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

const initialState={
  img:null,
  title:'',
  description:'',
  ingredients:[''],
  directions:[''],
  visibility:"true"
}

const reducer=(state,action)=>{
  switch(action.type){
    case 'updateTitle':
      return {...state, title:action.payload};
    case 'updateDescription':
      return {...state, description:action.payload};
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


const AddRecipeForm=({onClose, currentUser}) =>{

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
        console.log(state)
        break;
      case 'description':
          dispatch(updateDescription(value))
          console.log('description update')
          break;
      case 'directions':
          dispatch(updateDirections(value,event.target.id.replace('directions-','')))  
          console.log(state)  
          break;
      case 'ingredients':
          dispatch(updateIngredients(value,event.target.id.replace('ingredient-','')))  
          console.log(state)  
          break;    
      default:
        console.log('reducer error')
        break;
    }
  }

  const handleSubmit=()=>{
    const formData=new FormData()
    formData.append('recipeTitle',state.title)
    formData.append('recipeIngredients',state.ingredients)
    formData.append('recipeDirections',state.directions)
    formData.append('visibility',state.visibility)
    formData.append( 'upload',state.img)
    formData.append('authID',currentUser.authID)
     
    axios.post('http://localhost:3001/recipes',formData)
    .then(response=> {console.log(response)
                       onClose()})
    .catch(error=> console.log(error));

  }

  const classes=useStyles();

    return (
  
     <div className={classes.root}>
      <ImageUpload onDrop={handleDrop} removeImages={removeImages}/>
      <div className={classes.form}>
      <RecipeInputTabs onFormChange={handleFormChange} state={state} addDirections={()=>dispatch(addDirections())} deleteDirections={(value)=>dispatch(removeDirections(value))} addIngredient={()=>dispatch(addIngredients())} deleteIngredient={(value)=>dispatch(removeIngredients(value))} onClose={onClose}/>
     <div className={classes.buttonsGroup}>
     <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={handleSubmit}>
          Add Recipe
      </Button>
      <Button variant="contained" size="large" className={classes.cancelButton} onClick={onClose}>
          Cancel
      </Button>
     </div>
    </div>
     </div>
    
    );
  }

  const mapStateToProps = createStructuredSelector(
    {
      currentUser: selectCurrentUser
    }
  )

  export default connect(mapStateToProps)(AddRecipeForm);
