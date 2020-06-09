import UserActionTypes from './user.types';
import { withRouter } from 'react-router-dom';


const INITIAL_STATE={
    currentUser:null,
    error:null,
    loading:false
}

const UserReducer=(state=INITIAL_STATE, action)=>{
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:action.payload,
                error:null,
                loading:false
            };
        case UserActionTypes.GOOGLE_SIGN_IN_START:
        case UserActionTypes.EMAIL_SIGN_IN_START:    
        case UserActionTypes.SIGN_UP_START:
            return{
                ...state,
                loading:true
            };
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error:action.payload,
                loading:false
            };
        case UserActionTypes.SIGN_OUT_START:
            return {
                ...state,
                loading:true
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
             return {
                 ...state,
                currentUser:null,
                error:null,
                loading:false
                    };
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error:action.payload,
                loading:false
                    };    
        case UserActionTypes.CLEAR_USER_ERROR:
            return{
                ...state,
                error:null
            };        
        default:
            return state;
    }
}

export default UserReducer;