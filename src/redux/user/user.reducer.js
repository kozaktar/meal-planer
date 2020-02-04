import UsertActionTypes from './user.types'

const INITIAL_STATE={
    currentUser:null,
    error:null
}

const UserReducer=(state=INITIAL_STATE, action)=>{
    switch(action.type){
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
        default:
            return state;
    }
}

export default UserReducer;