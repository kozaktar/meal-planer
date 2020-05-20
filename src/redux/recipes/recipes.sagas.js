import {takeLatest, put,all, call, take} from 'redux-saga/effects';
import RecipeActionTypes from './recipes.types';
import axios from 'axios';
import {fetchRecipesSuccess, fetchRecipesFailure, addRecipeSuccess, addRecipesFailure, fetchUserRecipeTitlesFailure, fetchUserRecipeTitlesSuccess, fetchSearchedRecipesSuccess, fetchSearchedRecipesFailure, fetchRecipeByIDSuccess, fetchRecipesByIDFailure} from './recipes.actions';
import toggleAddRecipeDropdown from '../addRecipeModal/addRecipeModal.actions';

const recipesAPIpath='http://localhost:3001/recipes'



function* FetchRecipes({payload}){
    try{
        const path=recipesAPIpath+'?limit=10'
        yield axios.defaults.headers.common['userID'] =payload 
        const recipes=yield axios.get(path)
        //convert images to basse 64
        // const convertedImgRecipes=recipes.data.map(recipe=>{if(recipe.picture){
        //     recipe.picture=new Buffer(recipe.picture).toString('base64')
        //     return recipe
        // }})
        yield put(fetchRecipesSuccess(recipes.data))
    }
    catch(error){
       yield put(fetchRecipesFailure(error))
    }

}

function* FetchSearchedRecipes({payload}){
    try{
        const path=recipesAPIpath+'/search/'+payload
        const recipes=yield axios.get(path)
        
        yield put(fetchSearchedRecipesSuccess(recipes.data))
    }
    catch(error){
       yield put(fetchSearchedRecipesFailure(error))
    }

}

function* FetchRecipeById({payload}){
    const path=recipesAPIpath+'/ID/'+payload
    try{
        const recipe=yield axios.get(path)
        yield put(fetchRecipeByIDSuccess(recipe.data))
    }
    catch(error){
       yield put(fetchRecipesByIDFailure(error))
    }

}


function* FetchUserRecipeTitles({payload}){
    const path=recipesAPIpath+'/mytitles/'
    try{
        yield axios.defaults.headers.common['userID'] =payload 
        const recipeTitles=yield axios.get(path)
        //convert images to basse 64
    
        yield put(fetchUserRecipeTitlesSuccess(recipeTitles.data))
    }
    catch(error){
       yield put(fetchUserRecipeTitlesFailure(error))
    }

}

function* onRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPES_START, FetchRecipes)
}

function* onSearchRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_SEARCHED_RECIPES_START, FetchSearchedRecipes)
}

function* onUserRecipeTitlesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_USER_RECIPES_TITLES_START, FetchUserRecipeTitles)
}

function* onRecipesAddStart(){
    yield takeLatest(RecipeActionTypes.ADD_RECIPES_START, AddRecipes)
}

function* onRecipeByIDFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPE_BY_ID_START, FetchRecipeById)
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
    yield all([call(onRecipesFetchStart), call(onRecipesAddStart), call(onUserRecipeTitlesFetchStart), call(onSearchRecipesFetchStart), call(onRecipeByIDFetchStart)])
}

