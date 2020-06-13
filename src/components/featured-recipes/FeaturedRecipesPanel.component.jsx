import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchFeaturedRecipesStart} from '../../redux/recipes/recipes.actions';
import {selectRecipeError, selectFeaturedRecipe, selectRecipeLoading} from '../../redux/recipes/recipes.selectors';
import {createStructuredSelector} from 'reselect';
import RecipeDisplay from '../recipeDisplay/RecipeDisplay.component';
import Grid from '@material-ui/core/Grid';
import WithSpinner from '../spiner/withSpiner.component';

const RecipeDisplayWithSpiner=WithSpinner(RecipeDisplay)

const FeaturedRecipes=({featuredRecipes, featuredRecipesError, getFeaturedRecipes, loading})=>{
    useEffect(()=>{ getFeaturedRecipes(3) }, [])
        
       return (
            <Grid container spacing={2}>
                <RecipeDisplayWithSpiner isloading={loading} recipes={featuredRecipes} title={'Featured Recipes:'}/>
            </Grid>
        )
}

const mapDispatchToProps=dispatch=>({
    getFeaturedRecipes: (num)=>dispatch(fetchFeaturedRecipesStart(num))
})

const mapStateToProps=createStructuredSelector({
    featuredRecipes: selectFeaturedRecipe,
    featuredRecipesError: selectRecipeError,
    loading: selectRecipeLoading
})
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedRecipes)