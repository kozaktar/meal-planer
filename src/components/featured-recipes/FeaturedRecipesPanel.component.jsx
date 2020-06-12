import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchFeaturedRecipesStart} from '../../redux/recipes/recipes.actions';
import {selectRecipeError, selectFeaturedRecipe} from '../../redux/recipes/recipes.selectors';
import {createStructuredSelector} from 'reselect';
import RecipeCard from '../recipe-card/RecipeCard';


const FeaturedRecipes=({featuredRecipes, featuredRecipesError, getFeaturedRecipes})=>{
    useEffect(()=>{ getFeaturedRecipes(1) }, [])
        
        return (
            <div>
                {featuredRecipesError?featuredRecipesError:featuredRecipes.map(recipe=><RecipeCard key={recipe._id} recipe={recipe}/>)}
            </div>
        )
}

const mapDispatchToProps=dispatch=>({
    getFeaturedRecipes: (num)=>dispatch(fetchFeaturedRecipesStart(num))
})

const mapStateToProps=createStructuredSelector({
    featuredRecipes: selectFeaturedRecipe,
    featuredRecipesError: selectRecipeError
})
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedRecipes)