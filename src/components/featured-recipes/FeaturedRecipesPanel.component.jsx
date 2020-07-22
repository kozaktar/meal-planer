import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchFeaturedRecipesStart} from '../../redux/recipes/recipes.actions';
import {selectFeaturedRecipe, selectDisplayLoading} from '../../redux/recipes/recipes.selectors';
import {selectUserLoading} from '../../redux/user/user.selectors'
import {createStructuredSelector} from 'reselect';
import RecipeDisplay from '../recipeDisplay/RecipeDisplay.component';
import Grid from '@material-ui/core/Grid';
import WithSpinner from '../spiner/withSpiner.component';

const RecipeDisplayWithSpiner=WithSpinner(RecipeDisplay)

const FeaturedRecipes=({featuredRecipes, getFeaturedRecipes, recipeDisplayLoading})=>{
    useEffect(()=>{ getFeaturedRecipes(3) }, [getFeaturedRecipes])
        
       return (
            <Grid container spacing={2}>
                <RecipeDisplayWithSpiner isloading={recipeDisplayLoading} recipes={featuredRecipes} title={'Featured Recipes:'}/>
            </Grid>
        )
}

const mapDispatchToProps=dispatch=>({
    getFeaturedRecipes: (num)=>dispatch(fetchFeaturedRecipesStart(num))
})

const mapStateToProps=createStructuredSelector({
    featuredRecipes: selectFeaturedRecipe,
    userLoading:selectUserLoading,
    recipeDisplayLoading: selectDisplayLoading
})
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedRecipes)