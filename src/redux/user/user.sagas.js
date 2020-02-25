import {takeLatest, put,all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth,createUserProfileDocument, googleProvider} from '../../firebase/firebase.utils';
import {googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure} from './user.actions';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions'


export function* signInWithGoogle(){
    try{
        const authRef= yield auth.signInWithPopup(googleProvider)
        const user=yield createUserProfileDocument(authRef.user)
        
        yield put(toggleDropdown());
        yield put(googleSignInSuccess(user));       
    }
    catch(error){
        yield put(googleSignInFailure(error))
    }
}

function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* signInWithEmail({payload:{email,password}}){
    try{
        console.log('email:', email)
        const authRef= yield auth.signInWithEmailAndPassword(email,password)
        const user=yield createUserProfileDocument(authRef.user)
        
        yield put(toggleDropdown());
        yield put(emailSignInSuccess(user));       
    }
    catch(error){
        yield put(emailSignInFailure(error))
    }
}

function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}