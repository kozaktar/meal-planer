import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const HeaderComponentDiv=styled.div`
    display: flex;
    position: sticky;
    top:0;
    background: inherit
    justify-content: space-between;
    z-index: 1;
    padding: 2rem;
    height:8vh;
    border-bottom: 1px solid grey;
`

export const LinksContainerDiv=styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
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