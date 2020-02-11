import {takeLatest, put,all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth,createUserProfileDocument, googleProvider} from '../../firebase/firebase.utils';
import {googleSignInSuccess, googleSignInFailure} from './user.actions';
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

export function* userSagas(){
    yield all([call(onGoogleSignInStart)])
}