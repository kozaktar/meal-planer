import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import {withRouter} from 'react-router-dom';
import PlaceHolderImg from '../../assets/placeholder.jpg';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser, selectUserLoading} from '../../redux/user/user.selectors';
import {truncateString} from './CardUtils';
import {saveRecipeStart, unsaveRecipeStart} from '../../redux/recipes/recipes.actions'
import BookmarkButton from '../bookmark-button/BookmarkButton.component';
import WithSpinner from '../spiner/withSpiner.component';

const BookmarWithSpinner=WithSpinner(BookmarkButton);



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

const bookmarkSyles={
  position:"absolute",
  top:'20%',
  right:'5%',
  background:'rgba(79, 78, 78, 0.32)',
  zIndex:999,
  color:'white',
  borderRadius:'50%'
}

const RecipeCard=({recipe, history, loading})=>{


  const classes = useStyles();
  const handleActionAreaClick = () => {
    history.push(`/recipes/${recipe._id}`)
  };

  const picture=recipe.picture?`data:image;base64,${new Buffer(recipe.picture).toString('base64')}`:PlaceHolderImg
  
  return (
    <Card className={classes.root}>
     
   <BookmarWithSpinner recipe={recipe} classes={classes} isloading={loading} styles={bookmarkSyles}/>
  
      
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
      {/* {location.pathname==='/myrecipebox/myrecipes' && recipe.owner===currentUser.authID?
      (<CardActions disableSpacing className={classes.cardActions}>
        <EditRecipeButton id={recipe._id} style={currentUser===null || currentUser.authID!==recipe.owner?{display:'none'}:null}/>
        <DeleteRecipeButton id={recipe._id} style={currentUser===null ||currentUser.authID!==recipe.owner?{display:'none'}:null}/>
        </CardActions>):null} */}
      
    </Card>
  );
}

const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser,
  loading: selectUserLoading
  })

const mapDispatchToProps=dispatch=>({
  saveRecipe:(recipe)=>dispatch(saveRecipeStart(recipe)),
  unsaveRecipe:(recipe)=>dispatch(unsaveRecipeStart(recipe))

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard));