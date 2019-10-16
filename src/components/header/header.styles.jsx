import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Container} from '../../utility-styles/utility.styles'

export const HeaderComponentDiv=styled.div`
    display: flex;
    position: sticky;
    top:0;
    background:white;
    justify-content: space-between;
    z-index: 1201;
    padding: 2rem;
    height:8vh;
    // border-bottom: 1px solid grey;
    box-shadow: 0px 2px 13px 0px rgba(196,196,196,1);
`

export const LinksContainerDiv=styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
font-size:1rem;
`

export const OptionLink=styled(Link)`
    cursor: pointer;
    padding: 10px 15px;
    color: grey;
 
&:hover{
    background-color: grey;
    color: white;
    border-radius: 2rem;
}    
`

export const LogoContainer=styled(Link)`
    align-items: center;
    display:flex;
    font-size:2rem;
    color: #b33c00;
    font-family: 'Dancing Script', cursive;
`