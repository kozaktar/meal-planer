import UserActionTypes from './user.types';

const INITIAL_STATE={
    currentUser:null,
<<<<<<< HEAD
    error:null
=======
    error:null,
    loading:false
>>>>>>> tmp
}

const UserReducer=(state=INITIAL_STATE, action)=>{
    switch(action.type){
<<<<<<< HEAD
        case UsertActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case UsertActionTypes.EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:action.payload,
                error:null
            };
        case UsertActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case UsertActionTypes.EMAIL_SIGN_IN_FAILURE:
            return{
                ...state,
                error:action.payload
            }    
=======
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:action.payload,
                error:null,
                loading:false
            };
        case UserActionTypes.GOOGLE_SIGN_IN_START:
            return{
                ...state,
                loading:true
            };
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                error:action.payload,
                loading:false
            };
        case UserActionTypes.SIGN_OUT:
            return {
                ...state,
                currentUser:null
            };
        case UserActionTypes.CLEAR_USER_ERROR:
            return{
                ...state,
                error:null
            };        
>>>>>>> tmp
        default:
            return state;
    }
}

export default UserReducer;