import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';
import {withRouter} from 'react-router-dom';


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
      {/* </Link> */}
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions> --actions to add later: delete, hsare*/ } 
    </Card>
  );
}

export default withRouter(RecipeCard);