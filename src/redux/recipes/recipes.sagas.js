import {takeLatest, put,all, call} from 'redux-saga/effects';
import RecipeActionTypes from './recipes.types';
import axios from 'axios';
import {fetchRecipesSuccess, fetchRecipesFailure, addRecipeSuccess, addRecipesFailure, fetchUserRecipeTitlesFailure, fetchUserRecipeTitlesSuccess, fetchSearchedRecipesSuccess, fetchSearchedRecipesFailure, fetchRecipeByIDSuccess, fetchRecipesByIDFailure, deleteRecipeSuccess, deleteRecipeFailure, updateRecipeSuccess, updateRecipesFailure, fetchFeaturedRecipesSuccess, fetchFeaturedRecipesFailure, saveRecipeSuccess, saveRecipeFailure, unsaveRecipeSuccess, unsaveRecipeFailure} from './recipes.actions';
import toggleAddRecipeDropdown from '../addRecipeModal/addRecipeModal.actions';


const recipesAPIpath='http://localhost:3001/recipes';



function* FetchRecipes({payload}){
    try{
        const path=recipesAPIpath+'?limit= 10'
        yield axios.defaults.headers.common['userID'] =payload 
        const recipes=yield axios.get(path)
       
        yield put(fetchRecipesSuccess(recipes.data))
    }
    catch(error){
       yield put(fetchRecipesFailure(error))
    }
}

function* FetchFeaturedRecipes({payload}){
    try{
        const path=recipesAPIpath+'/public/featured?limit='+payload
        const recipes=yield axios.get(path)
        //recipes.data.picture=Buffer.from(recipes.data.picture, 'base64')
        yield put(fetchFeaturedRecipesSuccess(recipes.data))
    }
    catch(error){
       yield put(fetchFeaturedRecipesFailure(error))
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
    
        yield put(fetchUserRecipeTitlesSuccess(recipeTitles.data))
    }
    catch(error){
       yield put(fetchUserRecipeTitlesFailure(error))
    }
}

function* FetchPublicRecipeTitles({payload}){
    const path=recipesAPIpath+'/mytitles/'
    try{
        yield axios.defaults.headers.common['userID'] =payload 
        const recipeTitles=yield axios.get(path)
    
        yield put(fetchUserRecipeTitlesSuccess(recipeTitles.data))
    }
    catch(error){
       yield put(fetchUserRecipeTitlesFailure(error))
    }
}

function* UpdateRecipe({payload}){

    const id=payload._id
    delete payload._id
    const path=recipesAPIpath+"/"+id
    const formData=new FormData()

    for(const prop in payload){
        if(prop==='recipeIngredients' || prop==='recipeDirections'|| prop==='users')
          formData.append(prop,JSON.stringify(payload[prop]))
        else
            formData.append(prop, payload[prop])
    }

    try{ 
        const updatedRecipe=yield axios.patch(path, formData)
        yield put(updateRecipeSuccess(updatedRecipe.data))
        yield put(toggleAddRecipeDropdown())
    }
    catch(error){

        if(error.response.status==500)
            yield put(updateRecipesFailure('Error 500: File must be a valid image format and not larger than 2 MB.'))
        else
            yield put(updateRecipesFailure(error.response.data.error))
    }

}

function* onRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPES_START, FetchRecipes)
}

function* onFeaturedRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_FEATURED_RECIPES_START, FetchFeaturedRecipes)
}

function* onSearchRecipesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_SEARCHED_RECIPES_START, FetchSearchedRecipes)
}

function* onUserRecipeTitlesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_USER_RECIPES_TITLES_START, FetchUserRecipeTitles)
}

function* onPublicRecipeTitlesFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_PUBLIC_RECIPES_TITLES_START, FetchPublicRecipeTitles)
}

function* onRecipesAddStart(){
    yield takeLatest(RecipeActionTypes.ADD_RECIPES_START, AddRecipes)
}

function* onRecipeByIDFetchStart(){
    yield takeLatest(RecipeActionTypes.FETCH_RECIPE_BY_ID_START, FetchRecipeById)
}

function* onRecipeDeleteStart(){
    yield takeLatest(RecipeActionTypes.DELETE_RECIPE_START, DeleteRecipe)
}

function* onRecipeUpdateStart(){
    yield takeLatest(RecipeActionTypes.UPDATE_RECIPE_START, UpdateRecipe)
}

function* onRecipeSaveStart(){
    yield takeLatest(RecipeActionTypes.SAVE_RECIPES_START, SaveRecipe)
}

function* SaveRecipe({payload}){

    const id=payload._id
    delete payload._id
    const path=recipesAPIpath+"/"+id
    const update={'users':JSON.stringify(payload.users)}


    try{ 
        const updatedRecipe=yield axios.patch(path, update)
        yield put(saveRecipeSuccess(updatedRecipe.data))
    }
    catch(error){
        yield put(saveRecipeFailure(error.response.data.error))
    }

}

function* onRecipeUnsaveStart(){
    yield takeLatest(RecipeActionTypes.UNSAVE_RECIPES_START, UnsaveRecipe)
}

function* UnsaveRecipe({payload}){

    const id=payload._id
    delete payload._id
    const path=recipesAPIpath+"/"+id
    const update={'users':JSON.stringify(payload.users)}


    try{ 
        const updatedRecipe=yield axios.patch(path, update)
        console.log('unsave: ',updatedRecipe.data._id)
        yield put(unsaveRecipeSuccess(updatedRecipe.data._id))
    }
    catch(error){
        yield put(unsaveRecipeFailure(error.response.data.error))
    }

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
    yield formData.append('portions',payload.portions)
    yield formData.append('prepTime',payload.prepTime)
    try{
        yield axios.post('http://localhost:3001/recipes',formData).then((response)=>payload=response.data)
        yield put(addRecipeSuccess(payload))
        yield put(toggleAddRecipeDropdown())
    }
    catch(error){
       yield put(addRecipesFailure(error.message))
    }

}

function* DeleteRecipe({payload}){
    const path=recipesAPIpath+'/'+payload
    try{
       const recipeID=yield axios.delete(path)
        yield put(deleteRecipeSuccess(recipeID.data))
    }
    catch(error){
       yield put(deleteRecipeFailure(error.message))
    }

}



export function* recipeSagas(){
    yield all([call(onRecipesFetchStart), call(onRecipesAddStart), call(onUserRecipeTitlesFetchStart), call(onSearchRecipesFetchStart), call(onRecipeByIDFetchStart), call(onRecipeDeleteStart), call(onRecipeUpdateStart), call(onFeaturedRecipesFetchStart), call(onPublicRecipeTitlesFetchStart), call(onRecipeSaveStart), call(onRecipeUnsaveStart)])
}

