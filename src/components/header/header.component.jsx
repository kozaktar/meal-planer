import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {ReactComponent as Logo} from '../../assets/image2vector.svg';
import './header.styles.css'

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