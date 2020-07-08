import React, {useState} from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {saveRecipeStart, unsaveRecipeStart} from '../../redux/recipes/recipes.actions'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectSavingRecipe} from '../../redux/recipes/recipes.selectors';   


const BookmarkButton=({currentUser, saveRecipe, unsaveRecipe, classes, recipe, recipeSaving})=>{
    const [bookmarked, setBookmark]=useState(currentUser!==null && recipe.users.includes(currentUser.authID))

    const toggleBookmark=()=>{
        const recipeUpdate={}
        recipeUpdate._id=recipe._id
        if(recipe.users.includes(currentUser.authID)){
          recipeUpdate.users=recipe.users.filter(item=>item!==currentUser.authID)
          unsaveRecipe(recipeUpdate)
        }
        else
        {
          recipeUpdate.users=[...recipe.users, currentUser.authID]
          saveRecipe(recipeUpdate)
        }
        recipe.users=recipeUpdate.users
        setBookmark(!bookmarked)
        
      }
    return(
        <IconButton className={classes.bookmark} size='medium' onClick={toggleBookmark} disabled={recipe._id===recipeSaving}>
      {bookmarked?
      <Tooltip title='Remove recipe'>
      <BookmarkIcon className={classes.icon} fontSize="large"/>
      </Tooltip>:
      <Tooltip title='Save This Recipe'>
      <BookmarkBorderIcon className={classes.icon} fontSize="large"/>
      </Tooltip>
    }
   </IconButton>
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