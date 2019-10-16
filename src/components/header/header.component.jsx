import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import CustomButton from '../custom-button/cutom-button';
import SignInDropDown from '../Sign-In-DropDown/signInDropDown.component';
import {selectHiddenSignInModal} from '../../redux/sign-in-modal/sign-in-modal.selector';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import {auth} from '../../firebase/firebase.utils';

const HeaderComponent=({toggleDropdown,hidden, currentUser})=>(
   
    <HeaderComponentDiv>
        <LogoContainer to={'/'}>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            <OptionLink to ={'/about'}>About</OptionLink>
            {currentUser ? (<OptionLink to={'#'} onClick={()=>{auth.signOut()}}>
                Sign Out
            </OptionLink>) :
            (<OptionLink to={'#'} onClick={toggleDropdown}>
                Sign In
            </OptionLink>)
            }
        </LinksContainerDiv>
        <SignInDropDown/>
    </HeaderComponentDiv>
)

const mapDispatchToProps=dispatch=>({
    toggleDropdown:()=>dispatch(toggleDropdown()),
    signOut:()=>dispatch(selectCurrentUser(null))
})

const mapStateToProps=createStructuredSelector({
    hidden:selectHiddenSignInModal,
    currentUser:selectCurrentUser
});
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)