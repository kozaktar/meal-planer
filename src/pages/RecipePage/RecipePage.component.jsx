import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import RecipePageHeader from './RecipePageHeader.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectCurrentRecipe } from './../../redux/recipes/recipes.selectors';
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
import { fetchRecipeByIDStart} from '../../redux/recipes/recipes.actions'
import CircularProgress from '@material-ui/core/CircularProgress';



const styles=makeStyles(
    {
    spinerStyle:{
        position: 'fixed', /* or absolute */
        top: '50%',
        left: '50%',
          },
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

const RecipePage=({ location, fetchRecipe, currentUser, recipe})=>{
   // const recipeID=location.pathname.replace('/recipes/','');
    
    const matches = useMediaQuery('(max-width: 800px)');
    const classes=styles();
    useEffect(() => {
        
        fetchRecipe('5eac4756b4b60d51bceb5dbb')

        console.log('useEffect')
      }, [])

    if(recipe){  
    let picture=null;
    
   
    

        if(recipe.picture.type === 'Buffer'){
            picture=`data:image;base64,${new Buffer(recipe.picture).toString('base64')}`
          }

   
     return (
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
                <img src={picture} alt="recipe" className={`${classes.image} ${matches?classes.fullWidth:classes.halfWidth}`}/>
            </div>
            <RecipeInstructions recipeDirections={recipe.recipeDirections}/>
            </Paper>
        </Container>
    )
     }
 else return <CircularProgress className={classes.spinerStyle}/>
}

const mapStateToProps=createStructuredSelector({
    currentUser: selectCurrentUser,
    recipe: selectCurrentRecipe
})

const mapDispatchToProps=dispatch=>(
    {
        fetchRecipe:(id)=>dispatch(fetchRecipeByIDStart(id))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)