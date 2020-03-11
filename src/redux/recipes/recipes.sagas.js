import {takeLatest, put,all, call} from 'redux-saga/effects';
import RecipeActionTypes from './recipes.types';
import axios from 'axios';
import {fetchRecipesSuccess, fetchRecipesFailure, addRecipeSuccess, addRecipesFailure} from './recipes.actions';

const recipesAPIpath='http://localhost:3001/recipes?limit=10'


function* FetchRecipes({payload}){
    try{
        yield axios.defaults.headers.common['userID'] =payload 
        const recipes=yield axios.get(recipesAPIpath)
        yield put(fetchRecipesSuccess(recipes.data))
    }
    catch(error){
       yield put(fetchRecipesFailure(error))
    }

}

function* onRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPES_START, FetchRecipes)
}

function* onRecipesAddStart(){
    yield takeLatest(RecipeActionTypes.ADD_RECIPES_START, AddRecipes)
}

function* AddRecipes({payload}){
    yield console.log('file',payload.picture)
    const formData=new FormData()
    yield formData.append('recipeTitle',payload.recipeTitle)
    yield formData.append('recipeIngredients',payload.recipeIngredients)
    yield formData.append('recipeDirections',payload.recipeDirections)
    yield formData.append('visibility',payload.visibility)
    yield formData.append( 'picture',payload.picture)
    yield formData.append('author',payload.author)
    yield formData.append('recipeDescription',payload.recipeDescription,)
    try{
        yield axios.post('http://localhost:3001/recipes',formData).then((response)=>console.log(response))
        yield put(addRecipeSuccess(payload))
    }
    catch(error){
       yield put(addRecipesFailure(error))
    }

}



export function* recipeSagas(){
    yield all([call(onRecipesFetchStart), call(onRecipesAddStart)])
}

