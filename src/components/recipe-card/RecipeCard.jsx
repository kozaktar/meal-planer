import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';
import {Link, withRouter} from 'react-router-dom';

const styles={
  link:{
    '&:hover': {
      backgroundColor:'yellow',
 }
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 340,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const RecipeCard=({recipe, history})=>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const image=new Buffer(recipe.picture).toString('base64')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  return (
    <Card className={classes.root}>
      <CardHeader
        title={recipe.recipeTitle}
      />
      {/* <Link to={recipe._id} style={styles.link}> */}
      <CardActionArea onClick={()=>history.push(`/recipes/${recipe._id}`)}>
      {recipe.picture?
       <CardMedia
       className={classes.media}
       image={`data:imgage;base64,${image}`}
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