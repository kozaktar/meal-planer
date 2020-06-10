import React from 'react';
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


const useStyles = makeStyles(theme => ({
  root: {
    width: 375,
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
  },
  descriptionText:{
    textAlign:'left'
  }
}));

const RecipeCard=({recipe, history, currentUser})=>{
  const classes = useStyles();
  const handleActionAreaClick = () => {
    history.push(`/recipes/${recipe._id}`)
  };


  const picture=recipe.picture?`data:image;base64,${new Buffer(recipe.picture).toString('base64')}`:PlaceHolderImg
   
    
  return (
    <Card className={classes.root}>
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
    
      <CardActions disableSpacing className={classes.cardActions}>
        <EditRecipeButton id={recipe._id} style={currentUser===recipe.owner?{display:'none'}:null}/>
        <DeleteRecipeButton id={recipe._id} style={currentUser===recipe.owner?{display:'none'}:null}/>
      </CardActions>
    </Card>
  );
}

const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps)(RecipeCard));