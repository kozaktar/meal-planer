import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 340,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const RecipeCard=({recipe})=>{
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
      {recipe.picture?
       <CardMedia
       className={classes.media}
       image={`data:imgage;base64,${image}`}
       title={recipe.recipeTitle}
     />:null}
     
      <CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.recipeDescription}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
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
      </CardActions>
    </Card>
  );
}

export default RecipeCard;