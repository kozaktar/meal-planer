import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import CustomButton from '../custom-button/cutom-button';

const HeaderComponent=({toggleDropdown})=>(
   
    <HeaderComponentDiv>
        <LogoContainer to={'/'}>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            <OptionLink to={'/'}>Home</OptionLink>
            <OptionLink to ={'/contact'}>Contact Us</OptionLink>
            <CustomButton HeaderButton onClick={toggleDropdown}>
                Sign In
            </CustomButton>
        </LinksContainerDiv>
    </HeaderComponentDiv>
    
)

const mapDispatchToProps=dispatch=>({
    toggleDropdown:()=>dispatch(toggleDropdown())
})
export default connect(null,mapDispatchToProps)(HeaderComponent)