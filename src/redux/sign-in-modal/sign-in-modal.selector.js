import {createSelector} from 'reselect';

const selectSignInDropDown=state=>state.signInModal;

export const selectHiddenSignInModal=createSelector(
    [selectSignInDropDown],
    signInModal=>signInModal.hidden
)

export const selectSignInCreateAccountSwitch=createSelector(
    [selectSignInDropDown],
    signInModal=>signInModal.signInFormDisplay
)
