import React from 'react';
import Container from '@material-ui/core/Container';
import RecipePageHeader from './RecipePageHeader.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectUserRecipes } from './../../redux/recipes/recipes.selectors';
import {withRouter} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IngredientList from '../../components/ingredient-list/IngredientList.component';
import RecipeInstructions from '../../components/recipeInstructions/RecipeInstructions.component';


const styles=makeStyles(
    {
    wrapper:{
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            width:'100%'
    },
    wrapperReverse:{

        display:'flex',
        flexDirection:'column-reverse',
        flexWrap:'wrap',
        width:'100%'
    },
    image:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding:'10px',
        objectFit:'cover'
    },
    paper:{
        paddingLeft:'10px',
        paddingRight:'10px',
        minHeight:'92vh'

    },
    author:{
        marginTop:'-20px',
        marginBottom:'2vh'
    },
    grey:{
        color:'grey'
    },
    portions:{
        marginLeft:'40px'
    },
    halfWidth:{
        maxWidth:'50%'
    },
    fullWidth:{
        maxWidth:'100%'
    },
    recipeDescription:{
        marginBottom:'20px'
    },
    timeAndPortions:{
        fontSize:'20px'
    },
    heading:{
        marginTop:'20px'
    }

    
})

const RecipePage=({currentUser,recipes, location})=>{
    const matches = useMediaQuery('(max-width: 800px)');
    const classes=styles();
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
            <Paper className={classes.paper}>
            <RecipePageHeader>{recipe.recipeTitle}</RecipePageHeader>
            <div className={classes.author}><span className={classes.grey}>Recipe By: </span>{recipe.author}</div>
            <div className={matches?classes.wrapperReverse:classes.wrapper}>
                <div className={matches?classes.fullWidth:classes.halfWidth}> 
                     <div className={classes.recipeDescription}>{`"${recipe.recipeDescription}"`}</div>
                     <div className={classes.timeAndPortions}>
                         <span><Tooltip title="Cooking Time"><AccessTimeIcon/></Tooltip> 4 hours </span> 
                         <span className={classes.portions}><Tooltip title="Portions"><TimelapseIcon/></Tooltip> 5 Portions</span>
                     </div>
                     <Typography variant="h5" className={classes.heading}>
                        Ingredients:
                     </Typography>
                     <IngredientList ingredients={recipe.recipeIngredients}/>
                </div>
                <img src={`data:image;base64,${recipe.picture}`} alt="recipe" className={`${classes.image} ${matches?classes.fullWidth:classes.halfWidth}`}/>
            </div>
            <RecipeInstructions recipeDirections={recipe.recipeDirections}/>
            </Paper>
        </Container>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipes: selectUserRecipes
})

export default connect(mapStateToProps)(withRouter(RecipePage))