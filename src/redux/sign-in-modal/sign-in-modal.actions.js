import SignInModalActionTypes from './sign-in-modal.types';

export const toggleDropdown=()=>(
    {
        type: SignInModalActionTypes.TOGGLE_DROPDOWN
    }
);

export const colapseSigninModal=()=>(
    {
        type: SignInModalActionTypes.COLAPSE_MODAL
    }
);

export const signInCreateAccountSwitch=()=>(
    {
        type: SignInModalActionTypes.SIGN_IN_CREATE_ACCOUNT_SWITCH
    }
);