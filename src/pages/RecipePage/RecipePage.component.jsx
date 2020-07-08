import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import RecipePageHeader from './RecipePageHeader.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { selectCurrentRecipe, selectRecipePageLoading } from './../../redux/recipes/recipes.selectors';
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
import PlaceHolderImg from '../../assets/placeholder.jpg'
import EditRecipeButton from '../../components/edit-recipe-button/EditRecipeButton.component';
import Modal from '../../components/modal/modal.component';
import AddRecipeForm from '../../components/add-recipe-form/addRecipeForm.component';
import WithSpinner from '../../components/spiner/withSpiner.component';
import toggleAddRecipeDropdown from '../../redux/addRecipeModal/addRecipeModal.actions';
import {selectAdd_Recipe_Modal_Visible} from '../../redux/addRecipeModal/addRecipeModal.selectors';

const ModalWithSpinner=WithSpinner(Modal);

const styles=makeStyles(theme=>(
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
        objectFit:'cover',
        maxHeight:'50vh'
    },
    paper:{
        paddingLeft:'10px',
        paddingRight:'10px',
        minHeight:'92vh'

    },
    author:{
        marginTop:'-20px',
        marginBottom:'2vh',
        display:'flex',
        justifyContent:'space-between'
    },
    grey:{
        color:'grey'
    },
    portions:{
        marginLeft:'40px',
        [theme.breakpoints.down('sm')]:{
            display:'block',
        marginLeft:0
        }
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
    },
    

    
}))

const RecipePage=({ location, fetchRecipe, currentUser, recipe, loading, addRecipeVisible, loadingRecipeInfo, toggleAddRecipeDropdown})=>{

   const recipeID=location.pathname.replace('/recipes/','');
    
    const matches = useMediaQuery('(max-width: 800px)');
    const classes=styles();
    useEffect(() => {
        fetchRecipe(recipeID)
      }, [recipeID, fetchRecipe])

    if(recipe && !loading){  //check if recipe is not null and recipe id is = to id in the url (ensurse that the presiously viewed recipe doesnt briefly flash on the screen)

 
    const picture=recipe.picture?`data:image;base64,${new Buffer(recipe.picture).toString('base64')}`:PlaceHolderImg
   
     return (
        <Container>
            <ModalWithSpinner title={recipe?"Edit Recipe":"Add New Recipe"} handleClose={toggleAddRecipeDropdown} open={addRecipeVisible} isloading={loadingRecipeInfo}>
            <AddRecipeForm recipe={recipe}/>
          </ModalWithSpinner>
            <Paper className={classes.paper}>
            <RecipePageHeader>{recipe.recipeTitle}</RecipePageHeader>
            <div className={classes.author}>
                <span><span className={classes.grey}>Recipe By: </span>{recipe.author}</span>
                <EditRecipeButton disabled={currentUser===null || currentUser.authID!==recipe.owner}/>
            </div>
            <div className={matches?classes.wrapperReverse:classes.wrapper}>
                <div className={matches?classes.fullWidth:classes.halfWidth}> 
                     <div className={classes.recipeDescription}>{`"${recipe.recipeDescription}"`}</div>
                     <div className={classes.timeAndPortions}>
                         <span><Tooltip title="Cooking Time"><AccessTimeIcon/></Tooltip> {recipe.prepTime} </span> 
                         <span className={classes.portions}><Tooltip title="Portions"><TimelapseIcon/></Tooltip> {recipe.portions} Portion(s)</span>
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
    recipe: selectCurrentRecipe,
    loading: selectRecipePageLoading,
    addRecipeVisible: selectAdd_Recipe_Modal_Visible,
})

const mapDispatchToProps=dispatch=>(
    {
        fetchRecipe:(id)=>dispatch(fetchRecipeByIDStart(id)),
        toggleAddRecipeDropdown: ()=>dispatch(toggleAddRecipeDropdown()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecipePage))