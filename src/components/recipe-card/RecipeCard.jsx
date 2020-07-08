import React, {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import {withRouter} from 'react-router-dom';
import DeleteRecipeButton from '../delete-recipe-button/DeleteRecipeButton.component';
import EditRecipeButton from '../edit-recipe-button/EditRecipeButton.component';
import PlaceHolderImg from '../../assets/placeholder.jpg';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {truncateString} from './CardUtils';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import {updateRecipeStart} from '../../redux/recipes/recipes.actions'


const useStyles = makeStyles(theme => ({
  root: {
    width: 375,
    height:370,
    position:'relative',
    [theme.breakpoints.down('sm')]:{
      minWidth: 180,
      maxWidth:'76vw'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions:{
    padding:0, 
    display: 'flex',
    justifyContent:'flex-end',
    background: '#fafffb',
    paddingRight:15,
    alignSelf:'flex-end'
  },
  descriptionText:{
    textAlign:'left',
    height:30
  },
  bookmark:{
    position:"absolute",
    top:'20%',
    right:'5%',
    background:'rgba(79, 78, 78, 0.32)',
    zIndex:999,
    color:'white',
    borderRadius:'50%'
  },
  gold:{
    color:'rgb(212,175,55)'
  }
}));

const RecipeCard=({recipe, history, currentUser, location, updateRecipe})=>{
  const [bookmarked, setBookmark]=useState(currentUser!==null && recipe.users.includes(currentUser.authID))

  const classes = useStyles();
  const handleActionAreaClick = () => {
    history.push(`/recipes/${recipe._id}`)
  };

  const picture=recipe.picture?`data:image;base64,${new Buffer(recipe.picture).toString('base64')}`:PlaceHolderImg
  
  const toggleBookmark=()=>{
    const recipeUpdate={}
    recipeUpdate._id=recipe._id
    console.log(currentUser.authID)
    console.log(recipe.users.includes(currentUser.authID))
    recipe.users.includes(currentUser.authID)?
      recipeUpdate.users=recipe.users.filter(item=>item!==currentUser.authID)
    :recipeUpdate.users=[...recipe.users, currentUser.authID]
    updateRecipe(recipeUpdate)
    setBookmark(!bookmarked)
    
  }

  return (
    <Card className={classes.root}>
      {currentUser===null || recipe.users[0]!==currentUser.authID?
      <IconButton className={classes.bookmark} size='medium' onClick={toggleBookmark}>
      {bookmarked?
      <BookmarkIcon className={classes.icon} fontSize="large"/>:
      <BookmarkBorderIcon className={classes.icon} fontSize="large"/>
    }
   </IconButton>:
   <Tooltip title="You're the author of this recipe">
      <StarIcon className={`${classes.bookmark} ${classes.gold}`} fontSize='large'/>
   </Tooltip>
  }
      
      <CardHeader
        title={recipe.recipeTitle}
      />
      <CardActionArea onClick={handleActionAreaClick}>
       <CardMedia
       className={classes.media}
       image={picture}
       title={recipe.recipeTitle}
     />
  
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionText}>
          {truncateString(recipe.recipeDescription, 100)}
        </Typography>
      </CardContent>
      
      </CardActionArea>
      {location.pathname==='/myrecipebox/myrecipes'?
      (<CardActions disableSpacing className={classes.cardActions}>
        <EditRecipeButton id={recipe._id} style={currentUser===null || currentUser.authID!==recipe.owner?{display:'none'}:null}/>
        <DeleteRecipeButton id={recipe._id} style={currentUser===null ||currentUser.authID!==recipe.owner?{display:'none'}:null}/>
        </CardActions>):null}
      
    </Card>
  );
}

const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps=dispatch=>({
  updateRecipe:(recipe)=>dispatch(updateRecipeStart(recipe))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard));