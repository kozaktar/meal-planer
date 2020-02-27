import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import SignInDropDown from '../Sign-In-DropDown/signInDropDown.component';
import {selectHiddenSignInModal} from '../../redux/sign-in-modal/sign-in-modal.selector';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart, clearUserError} from '../../redux/user/user.actions'
import {createStructuredSelector} from 'reselect';

const HeaderComponent=({toggleDropdown,signOutUser, currentUser, clearLoginError})=>(
   
    <HeaderComponentDiv>
        <LogoContainer to={'/'}>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            <OptionLink to ={'/about'}>About</OptionLink>
            {currentUser ? (<OptionLink to={'#'} onClick={()=>{
                signOutUser();
                }}>
                Sign Out
            </OptionLink>) :
            (<OptionLink to={'#'} onClick={()=>{toggleDropdown(); clearLoginError()}}>
                Sign In
            </OptionLink>)
            }
        </LinksContainerDiv>
        <SignInDropDown/>
    </HeaderComponentDiv>
)

const mapDispatchToProps=dispatch=>({
    toggleDropdown:()=>dispatch(toggleDropdown()),
    signOutUser:()=>dispatch(signOutStart()),
    clearLoginError:()=>dispatch(clearUserError())
})

const mapStateToProps=createStructuredSelector({
    hidden:selectHiddenSignInModal,
    currentUser:selectCurrentUser
});
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)