import {takeLatest, put,all, call} from 'redux-saga/effects';
import RecipeActionTypes from './recipes.types';
import axios from 'axios';
import {fetchRecipesSuccess, fetchRecipesFailure} from './recipes.actions';

const recipesAPIpath='http://localhost:3001/recipes?limit=10'


function* FetchRecipes({payload}){
    try{
        yield console.log('user',payload)
        yield axios.defaults.headers.common['userID'] =payload 
        const recipes=yield axios.get(recipesAPIpath).then(res=>console.log(res.data)).catch(e=>console.log(e))
        put(fetchRecipesSuccess(recipes))
    }
    catch(error){
        put(fetchRecipesFailure(error))
    }

}

function* onRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPES_START, FetchRecipes)
}

export function* recipeSagas(){
    yield all([call(onRecipesFetchStart)])
}

