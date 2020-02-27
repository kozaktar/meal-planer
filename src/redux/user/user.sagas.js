
import {takeLatest, put,all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth,createUserProfileDocument, googleProvider, getCurrentUser} from '../../firebase/firebase.utils';
import {signInSuccess, signInFailure, signOutFailure, signOutSuccess} from './user.actions';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';



export function* signInWithGoogle(){
    try{
        const authRef= yield auth.signInWithPopup(googleProvider)
        const user=yield createUserProfileDocument(authRef.user)
        
        yield put(toggleDropdown());
        yield put(signInSuccess(user));       
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
    }
    catch(error){
        yield put(signOutFailure(error))
    }
}

function* onSingOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function* isUserAuthenticated(){
    try{
        const userAuth=yield getCurrentUser()
        if(!userAuth) return;
        const user=yield createUserProfileDocument(userAuth);
        yield put(signInSuccess(user))
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(isUserAuthenticated), call(onSingOutStart)])
}

