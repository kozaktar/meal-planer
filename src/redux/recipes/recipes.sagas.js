import {takeLatest, put,all, call} from 'redux-saga/effects';
import RecipeActionTypes from './recipes.types';
import axios from 'axios';
import {fetchRecipesSuccess, fetchRecipesFailure, addRecipeSuccess, addRecipesFailure, fetchUserRecipeTitlesFailure, fetchUserRecipeTitlesSuccess} from './recipes.actions';
import toggleAddRecipeDropdown from '../addRecipeModal/addRecipeModal.actions';

const recipesAPIpath='http://localhost:3001/recipes?limit=10'
const userRecipesTitlesAPIpath='http://localhost:3001/recipes/mytitles'


function* FetchRecipes({payload}){
    try{
        yield axios.defaults.headers.common['userID'] =payload 
        const recipes=yield axios.get(recipesAPIpath)
        //convert images to basse 64
        const convertedImgRecipes=recipes.data.map(recipe=>{if(recipe.picture){
            recipe.picture=new Buffer(recipe.picture).toString('base64')
            return recipe
        }})
        yield put(fetchRecipesSuccess(convertedImgRecipes))
    }
    catch(error){
       yield put(fetchRecipesFailure(error))
    }

}

function* FetchUserRecipeTitles({payload}){
    try{
        yield axios.defaults.headers.common['userID'] =payload 
        const recipeTitles=yield axios.get(userRecipesTitlesAPIpath)
        //convert images to basse 64
    
        yield put(fetchUserRecipeTitlesSuccess(recipeTitles))
    }
    catch(error){
       yield put(fetchUserRecipeTitlesFailure(error))
    }

}

function* onRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPES_START, FetchRecipes)
}

function* onUserRecipeTitlesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_USER_RECIPES_TITLES_START, FetchUserRecipeTitles)
}

function* onRecipesAddStart(){
    yield takeLatest(RecipeActionTypes.ADD_RECIPES_START, AddRecipes)
}

function* AddRecipes({payload}){
    const formData=new FormData()
    yield formData.append('recipeTitle',payload.recipeTitle)
    yield formData.append('recipeIngredients',JSON.stringify(payload.recipeIngredients))
    yield formData.append('recipeDirections',JSON.stringify(payload.recipeDirections))
    yield formData.append('visibility',payload.visibility)
    yield formData.append( 'picture',payload.picture)
    yield formData.append('author',payload.author)
    yield formData.append('recipeDescription',payload.recipeDescription)
    try{
        yield axios.post('http://localhost:3001/recipes',formData).then((response)=>console.log(response))
        yield put(addRecipeSuccess(payload))
        yield put(toggleAddRecipeDropdown())
    }
    catch(error){
       yield put(addRecipesFailure(error.message))
    }

}



export function* recipeSagas(){
    yield all([call(onRecipesFetchStart), call(onRecipesAddStart), call(onUserRecipeTitlesFetchStart)])
}

