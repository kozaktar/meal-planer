import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { selectUserRecipes, selectSearchResults } from '../../redux/recipes/recipes.selectors';
import RecipeCard from '../recipe-card/RecipeCard';
import { createStructuredSelector } from 'reselect';

const RecipeDisplay=({recipes, searchResults})=>{
    if(searchResults.length>0){
        if(searchResults[0]==='No reipes found')
            return <h2>No reipes found</h2>
        else
            return  searchResults.map(item=>(<Grid item key={item._id}>
                <RecipeCard recipe={item}/>
              </Grid>)
            )
    }
    else
        return recipes.map(item=>(<Grid item key={item._id}>
            <RecipeCard recipe={item}/>
          </Grid>))

}

const mapStateToProps=createStructuredSelector({
    recipes: selectUserRecipes,
    searchResults: selectSearchResults
})

export default connect(mapStateToProps)(RecipeDisplay)