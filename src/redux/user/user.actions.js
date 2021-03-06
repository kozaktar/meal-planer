import UserActionTypes from './user.types';

export const googleSignInStart=()=>(
    {
    type: UserActionTypes.GOOGLE_SIGN_IN_START
    }
)

export const signInSuccess=(user)=>(
    {
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload:user
    }
)

export const signInFailure=(error)=>(
    {
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload:error
    }
)

export const emailSignInStart=(email, password)=>(
    {
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload:{email,password}
    }
)

export const signOutStart=()=>(
    {
        type:UserActionTypes.SIGN_OUT_START
    }
)

export const signOutSuccess=()=>(
    {
        type:UserActionTypes.SIGN_OUT_SUCCESS
    }
)

export const signOutFailure=(error)=>(
    {
        type:UserActionTypes.SIGN_OUT_SUFAILURE,
        payload:error
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
    }
)

export const signUpStart=(email, confirmEmail, password, confirmPassword, username)=>(
    {
    type: UserActionTypes.SIGN_UP_START,
    payload:{email,confirmEmail,password,confirmPassword,username}
    }
)