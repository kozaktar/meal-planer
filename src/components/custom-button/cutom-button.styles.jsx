import styled, {css} from 'styled-components';

const HeaderButtonStyles=css`
    color: grey;

    &:hover{
    background-color: grey;
    color: white;
    border-radius: 2rem;
}   
`

const getButtonStyles=props=>{
    if(props.HeaderButton)
        return HeaderButtonStyles
}

export const CustomButtonContainer=styled.button`
    cursor: pointer;
    padding: 10px 15px;
    border: none;
    background:white;
    font-size:1rem;
    ${getButtonStyles}
`