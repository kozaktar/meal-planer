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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BookmarkButton=({currentUser, saveRecipe, unsaveRecipe, classes, recipe, recipeSaving})=>{
    const [bookmarked, setBookmark]=useState(currentUser!==null && recipe.users.includes(currentUser.authID))
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const toggleBookmark=()=>{
      if(!currentUser){
        setOpen(true)
        return
      }

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
      <Fragment>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          You need to be loged in to save a recipe!
        </Alert>
      </Snackbar>
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