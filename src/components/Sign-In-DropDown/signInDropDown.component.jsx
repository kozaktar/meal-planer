import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectSignInCreateAccountSwitch} from '../../redux/sign-in-modal/sign-in-modal.selector';
import SignInForm from '../SignInForm/SignInForm.component';
import SignUpForm from '../SignUpForm/signUpForm';
import Modal from '../modal/modal.component';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions'
import {selectHiddenSignInModal} from '../../redux/sign-in-modal/sign-in-modal.selector'

const styles={
  marginTop: -400
}
const SignInDropDown = ({signInCreateAccountSwitch, toggleDropdown, hidden})=>(
    <Modal title={signInCreateAccountSwitch?'LogIn To Your Account':'Create New Account'} handleClose={toggleDropdown} open={!hidden}>
    {signInCreateAccountSwitch ? <SignInForm/>: <SignUpForm/>}
</Modal>
)

const mapStateToProps=createStructuredSelector(
  {
    signInCreateAccountSwitch: selectSignInCreateAccountSwitch,
    hidden: selectHiddenSignInModal
  }
)

const mapDispatchToProps = dispatch => ({
  toggleDropdown: () => dispatch(toggleDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInDropDown);