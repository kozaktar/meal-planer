import UserActionTypes from './user.types';

const INITIAL_STATE={
    currentUser:null,
    error:null,
    loading:false
}

const UserReducer=(state=INITIAL_STATE, action)=>{
    switch(action.type){
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
            }
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        case UserActionTypes.SIGN_OUT:
            return {
                ...state,
                currentUser:null
            }    
        default:
            return state;
    }
}

export default UserReducer;