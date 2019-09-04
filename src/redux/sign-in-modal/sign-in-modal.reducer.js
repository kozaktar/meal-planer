import SignInModalActionTypes from './sign-in-modal.types';

const INITIAL_STATE={
    hidden:true
}

const SignInModalReducer=(state=INITIAL_STATE ,action)=>{
    switch(action.type){
        case SignInModalActionTypes.TOGGLE_DROPDOWN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;    
    }
}

export default SignInModalReducer