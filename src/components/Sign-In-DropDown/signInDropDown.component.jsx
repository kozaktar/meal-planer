import React from 'react';
import {Modal, ModalContent, CloseButton, ModalHeader, ModalTitle} from './signInDropDown.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions'
import SignInPage from '../../pages/SignIn/SignIn.component';

const SignInDropDown=({toggleDropdown})=>(
<Modal>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>LogIn To Your Account</ModalTitle>
      <CloseButton onClick={toggleDropdown}>&times;</CloseButton>
    </ModalHeader>
    <SignInPage/>
  </ModalContent>
  </Modal>
)

const mapDispatchToProps=dispatch=>({
  toggleDropdown:()=>dispatch(toggleDropdown())
})

export default connect(null,mapDispatchToProps)(SignInDropDown);