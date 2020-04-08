import React from 'react';
import Container from '@material-ui/core/Container';
import RecipePageHeader from './RecipePageHeader.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectUserRecipes } from './../../redux/recipes/recipes.selectors';
import {withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles={
    image:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    paper:{
        paddingLeft:'10px',
        paddingRight:'10px'
    },
    author:{
        marginTop:'-20px',
        marginBottom:'5vh'
    }
}

const RecipePage=({currentUser,recipes, location})=>{

    const recipeName=location.pathname.replace('/recipes/','');
    let recipe=null;
    if(currentUser){
        recipe=recipes.find(({recipeTitle})=>recipeTitle===recipeName);
    }
    else{
        //grab the recipe from the database for public view --to be used for sharing recipes--
        console.log('else close is exectured')
    }

    return(
        <Container>
            <Paper style={styles.paper}>
            <RecipePageHeader>{recipe.recipeTitle}</RecipePageHeader>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} >
            <p style={styles.author}>Recipe By:{recipe.author}</p>
            <p>{`"${recipe.recipeDescription}"`}</p>

        </Grid>
        <Grid item xs={12} sm={6}>
        <img src={`data:image;base64,${recipe.picture}`} alt="recipe" style={styles.image}/>

        </Grid>
        </Grid>

            <Typography variant="body2" color="textSecondary" component="p">
          {recipe.recipeDescription}
            </Typography>
            </Paper>
        </Container>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipes: selectUserRecipes
})

export default connect(mapStateToProps)(withRouter(RecipePage))