import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {ReactComponent as Logo} from '../../assets/image2vector.svg';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions'

const HeaderComponent=()=>(
   
    <HeaderComponentDiv>
        <LogoContainer>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            <OptionLink>Home</OptionLink>
            <OptionLink>Contact Us</OptionLink>
            <OptionLink>Sign In</OptionLink>
        </LinksContainerDiv>
    </HeaderComponentDiv>
    
)
export default HeaderComponent