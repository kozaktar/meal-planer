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
    yield console.log('add recipes payload',payload)
    const formData=new FormData()
    yield formData.append('recipeTitle',payload.title)
    yield formData.append('recipeIngredients',payload.ingredients)
    yield formData.append('recipeDirections',payload.directions)
    yield formData.append('visibility',payload.visibility)
    yield formData.append( 'upload',payload.picture)
    yield formData.append('author',payload.author)
    try{
        yield axios.post('http://localhost:3001/recipes',payload).then((response)=>console.log(response))
        yield put(addRecipeSuccess(payload))
    }
    catch(error){
       yield put(addRecipesFailure(error))
    }

}



export function* recipeSagas(){
    yield all([call(onRecipesFetchStart), call(onRecipesAddStart)])
}

