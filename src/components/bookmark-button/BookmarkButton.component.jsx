import React, {useState, Fragment} from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {saveRecipeStart, unsaveRecipeStart} from '../../redux/recipes/recipes.actions'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectSavingRecipe} from '../../redux/recipes/recipes.selectors';
import AllertPanel from '../allert-panel/AllertPanel.component'; 


const BookmarkButton=({currentUser, saveRecipe, unsaveRecipe, classes, recipe, recipeSaving})=>{

    const [open, setOpen] = useState(false); //controlls alert popup -> 'you need to be loged in to save a recipe'

  //handle close for alet popup  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    //called when user clicks bookmark button
    const toggleBookmark=()=>{
      if(!currentUser){
        setOpen(true)
        return
      }

        //recipe update object to be sent to reducer on click
        const recipeUpdate={}
        recipeUpdate._id=recipe._id //id of the recipe to be updated

        //if userID is inluced in the recipe users list then it should be remove on click of bookmark button 'unbookmark'
        if(recipe.users.includes(currentUser.authID)){
          recipeUpdate.users=recipe.users.filter(item=>item!==currentUser.authID)
          unsaveRecipe(recipeUpdate)
        }
        else //if userID is not inluced in the recipe users list then it should be added on click of bookmark button 'bookmark'
        {
          recipeUpdate.users=[...recipe.users, currentUser.authID]
          saveRecipe(recipeUpdate)
        }
        recipe.users=recipeUpdate.users
        
      }
    return(
      <Fragment>
        {/* Allert panel to display allert ifuser is not loged in */}
        <AllertPanel severity="info" message="You need to be loged in to save a recipe!" open={open} handleClose={handleClose}/>

      {/* Icon button displays different icon depending if the recipe is bookmarked or not */}
      <IconButton className={classes.bookmark} size='medium' onClick={toggleBookmark} disabled={recipe._id===recipeSaving} id='bookmarkButton'>
      {currentUser!==null && recipe.users.includes(currentUser.authID)?
      <Tooltip title='Remove recipe'>
      <BookmarkIcon className={classes.icon} fontSize="large"/>
      </Tooltip>:
      <Tooltip title='Save This Recipe'>
      <BookmarkBorderIcon className={classes.icon} fontSize="large"/>
      </Tooltip>
    }
   </IconButton>
   </Fragment>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipeSaving: selectSavingRecipe
  })
  
  const mapDispatchToProps=dispatch=>({
    saveRecipe:(recipe)=>dispatch(saveRecipeStart(recipe)),
    unsaveRecipe:(recipe)=>dispatch(unsaveRecipeStart(recipe))
  
  })

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkButton)