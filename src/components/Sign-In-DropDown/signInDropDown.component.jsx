import React from 'react';
import { Modal, ModalContent, CloseButton, ModalHeader, ModalTitle} from './signInDropDown.styles';
import { connect } from 'react-redux';
import { toggleDropdown } from '../../redux/sign-in-modal/sign-in-modal.actions'
import {createStructuredSelector} from 'reselect';
import {selectSignInCreateAccountSwitch} from '../../redux/sign-in-modal/sign-in-modal.selector';
import SignInForm from '../SignInForm/SignInForm.component';
import SignUpForm from '../SignUpForm/signUpForm';

const SignInDropDown = ({signInCreateAccountSwitch, toggleDropdown})=>(
  <Modal>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>{signInCreateAccountSwitch?'LogIn To Your Account':'Create New Account'}</ModalTitle>
      <CloseButton onClick={toggleDropdown}>&times;</CloseButton>
    </ModalHeader>
    {signInCreateAccountSwitch?<SignInForm/>: <SignUpForm/>}
  </ModalContent>
</Modal>
)

const mapDispatchToProps = dispatch => ({
  toggleDropdown: () => dispatch(toggleDropdown())
})

const mapStateToProps=createStructuredSelector(
  {
    signInCreateAccountSwitch: selectSignInCreateAccountSwitch
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SignInDropDown);