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


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '90vw',
    minWidth: 375,
    [theme.breakpoints.down('sm')]:{
      minWidth: 250,
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
  }
}));

const RecipeCard=({recipe, history})=>{
  const classes = useStyles();

  const handleActionAreaClick = () => {
    history.push(`/recipes/${recipe._id}`)
  };

  const picture=`data:image;base64,${new Buffer(recipe.picture).toString('base64')}`
   
    
  return (
    <Card className={classes.root}>
      <CardHeader
        title={recipe.recipeTitle}
      />
      <CardActionArea onClick={handleActionAreaClick}>
      {recipe.picture?
       <CardMedia
       className={classes.media}
       image={picture}
       title={recipe.recipeTitle}
     />:null}
     
  
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.recipeDescription}
        </Typography>
      </CardContent>
      
      </CardActionArea>
    
      <CardActions disableSpacing className={classes.cardActions}>
        <EditRecipeButton id={recipe._id}/>
        <DeleteRecipeButton id={recipe._id}/>
      </CardActions>
    </Card>
  );
}

export default withRouter(RecipeCard);