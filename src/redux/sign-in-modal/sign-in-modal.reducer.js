import SignInModalActionTypes from './sign-in-modal.types';

const INITIAL_STATE={
    hidden:true,
    signInFormDisplay:true,
}

const SignInModalReducer=(state=INITIAL_STATE ,action)=>{
    switch(action.type){
        case SignInModalActionTypes.TOGGLE_DROPDOWN:
            return {
                ...state,
                hidden: !state.hidden,
                signInFormDisplay:true
            };
        case SignInModalActionTypes.SIGN_IN_CREATE_ACCOUNT_SWITCH:
                return {
                    ...state,
                    signInFormDisplay: !state.signInFormDisplay
                };    
        default:
            return state;    
    }
}

export default SignInModalReducer