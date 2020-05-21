import {takeLatest, put,all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth,createUserProfileDocument, googleProvider, getCurrentUser} from '../../firebase/firebase.utils';
import {signInSuccess, signInFailure, signOutFailure, signOutSuccess} from './user.actions';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import {fetchRecipesStart, clearRecipes, fetchUserRecipeTitlesStart} from '../recipes/recipes.actions';
import {fetchShopingListStart} from '../shopingList/shopingList.actions';



export function* signInWithGoogle(){
    try{
        const authRef= yield auth.signInWithPopup(googleProvider)
        const user=yield createUserProfileDocument(authRef.user)
        
        yield put(toggleDropdown());
        yield put(signInSuccess(user)); 
        yield put(fetchShopingListStart(user.authID));
        yield put(fetchRecipesStart(user.authID));
        yield put(fetchUserRecipeTitlesStart(user.authID));     
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* signInWithEmail({payload:{email,password}}){
    try{
        const authRef= yield auth.signInWithEmailAndPassword(email,password)
        const user=yield createUserProfileDocument(authRef.user)
        
        yield put(toggleDropdown());
        yield put(signInSuccess(user));
        yield put(fetchShopingListStart(user.authID));
        yield put(fetchRecipesStart(user.authID));
        yield put(fetchUserRecipeTitlesStart(user.authID));          
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

function* signOut(){
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
        yield put(clearRecipes())
    }
    catch(error){
        yield put(signOutFailure(error))
    }
}

function* onSingOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

function* isUserAuthenticated(){
    try{
        const userAuth=yield getCurrentUser()
        if(!userAuth) return;
        const user=yield createUserProfileDocument(userAuth);
        yield put(signInSuccess(user));
        yield put(fetchShopingListStart(user.authID));
        yield put(fetchRecipesStart(user.authID));
        yield put(fetchUserRecipeTitlesStart(user.authID)); 
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

function* signUp({payload:{email,confirmEmail,password,confirmPassword,username}}){
    try{
        if(email===confirmEmail && password===confirmPassword){
               const {user}= yield auth.createUserWithEmailAndPassword(email, password);
               const newUser=yield createUserProfileDocument(user, username);
               yield put(signInSuccess(newUser))
               yield put(toggleDropdown());
    
            }
        else{
            throw new Error("Mismatch! Check your entries.")
        }
    }
    catch(error){
        yield put(signInFailure(error))
    }
}


function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(isUserAuthenticated), call(onSingOutStart), call(onSignUpStart)])
}

