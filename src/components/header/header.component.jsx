import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import CustomButton from '../custom-button/cutom-button';
import SignInDropDown from '../Sign-In-DropDown/signInDropDown.component';

const HeaderComponent=({toggleDropdown,hidden})=>(
   
    <HeaderComponentDiv>
        <LogoContainer to={'/'}>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            <OptionLink to={'/'}>Home</OptionLink>
            <OptionLink to ={'/contact'}>Contact Us</OptionLink>
            <CustomButton HeaderButton onClick={toggleDropdown}>
                Sign In
            </CustomButton>
        </LinksContainerDiv>
        {!hidden?<SignInDropDown/>:null}
    </HeaderComponentDiv>
    
)

const mapDispatchToProps=dispatch=>({
    toggleDropdown:()=>dispatch(toggleDropdown())
})

const mapStateToProps=(state)=>({
    hidden:state.signInModal.hidden
});
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)