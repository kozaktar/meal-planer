import UserActionTypes from './user.types';

export const setCurrentUser=user=>(
    {
    type: UserActionTypes.SET_CURRENT_USER,
    payload:user
    }
)

export const googleSignInStart=()=>(
    {
<<<<<<< HEAD
        type: UserActionTypes.GOOGLE_SIGN_IN_START,
    }
)

export const googleSignInSuccess=user=>(
    {
        type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
        payload:user
    }
)

export const googleSignInFailure=error=>(
    {
        type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
        payload:error
    }
)

export const emailSignInStart=EmailAndPassword=>(
    {
        type: UserActionTypes.EMAIL_SIGN_IN_START,
        payload:EmailAndPassword
    }
)

export const emailSignInSuccess=user=>(
    {
        type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
        payload:user
    }
)

export const emailSignInFailure=error=>(
    {
        type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
        payload:error
=======
    type: UserActionTypes.GOOGLE_SIGN_IN_START
    }
)

export const googleSignInSuccess=(user)=>(
    {
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload:user
    }
)

export const googleSignInFailure=(error)=>(
    {
    type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload:error
    }
)

export const emailSignInStart=(email, password)=>(
    {
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload:{email,password}
    }
)

export const emailSignInSuccess=(userAndPassword)=>(
    {
    type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload:userAndPassword
    }
)

export const emailSignInFailure=(error)=>(
    {
    type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload:error
    }
)

export const signOut=()=>(
    {
        type:UserActionTypes.SIGN_OUT
    }
)

export const clearUserError=()=>(
    {
        type:UserActionTypes.CLEAR_USER_ERROR
    }
)

export const checkUserSession=()=>(
    {
        type:UserActionTypes.CHECK_USER_SESSION
>>>>>>> tmp
    }
)