import React, { Fragment, useState} from 'react';
import ImageUpload from '../image-upload/ImageUpload.component'
import RecipeInputTabs from '../recipeInputTabs/recipeInputTabs.component'
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    flexDirection:'row'
  },
}));

const AddRecipeForm=() =>{
 
  const [imgs, setImgs]=useState([]);
  const [recipeInfo, setRecipeInfo]=useState({title:'', description:'', ingredients:'', directions:''})

  const handleDrop=(acceptedFiles)=>{
    setImgs([...imgs, ...acceptedFiles])
    const url=URL.createObjectURL(acceptedFiles[0])
    console.log(url);
  }

  const handleFormChange=event=>{
    const { value, id } = event.target;
    setRecipeInfo({
      ...recipeInfo,
      [id]:value
    })
    console.log(recipeInfo)
  }

  const classes=useStyles();

    return (
     <div className={classes.root}>
      <ImageUpload onDrop={handleDrop}/>
      <RecipeInputTabs onFormChange={handleFormChange}/>
     </div>
    );
  }

export default AddRecipeForm;