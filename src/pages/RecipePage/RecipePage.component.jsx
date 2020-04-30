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


const styles=makeStyles(
    {
    wrapper:{
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap'
    },
    wrapperReverse:{
        display:'flex',
        flexDirection:'column-reverse',
        flexWrap:'wrap'
    },
    image:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '50%',
        maxHeight: 'auto',
        padding:'10px'
    },
    paper:{
        paddingLeft:'10px',
        paddingRight:'10px'
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
    timeAndPortions:{
        marginTop:'30px',
        fontSize:'24px'
    },
    gridComponent:{
        maxWidth:'50%'
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
                <div className={classes.gridComponent}>
                     <div>{`"${recipe.recipeDescription}"`}</div>
                     <Typography variant="h5">
                        Ingredients:<span style={{marginLeft:'60px'}}><Tooltip title="Cooking Time"><AccessTimeIcon/></Tooltip> 4 hours <span className={classes.portions}><Tooltip title="Portions"><TimelapseIcon/></Tooltip> 5 Portions</span></span>
                     </Typography>
                     <IngredientList ingredients={recipe.recipeIngredients}/>
                </div>
                <img src={`data:image;base64,${recipe.picture}`} alt="recipe" className={classes.image}/>
            </div>
            
           
       
            </Paper>
        </Container>
    )
}

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipes: selectUserRecipes
})

export default connect(mapStateToProps)(withRouter(RecipePage))