import styled, {css} from 'styled-components';

const HeaderButtonStyles=css`
    color:grey;
    &:hover{
    background-color: grey;
    color: white;
    border-radius: 2rem;
}   
`;

const GoogleButtonStyles=css`
    color:white;
    background-color:#DB4437;
    width:100%;
    &:hover{
    background-color: #DB3445;
    color: white;
}   
`;

const SignInButtonStyles=css`
    color: White;
    background-color:black;
    width:100%;
    &:hover{
    background-color: grey;
    color: white;
}   
`;

const LinkStyles=css`
    color: blue;
    padding:5px;
    font-size:1rem;
    background-color: rgba(0, 0, 0, 0);
    &:hover{
    color: black;
}   
`;



const getButtonStyles=props=>{
    if(props.HeaderButton)
        return HeaderButtonStyles;
    else if(props.SignIn)
        return SignInButtonStyles;
    else if(props.GoogleSignIn)
        return GoogleButtonStyles;
    else if(props.Link)
        return LinkStyles
}

export const CustomButtonContainer=styled.button`
    cursor: pointer;
    padding: 10px 15px;
    border: none;
    background:white;
    font-size:1rem;
    border-radius:5px;
    ${getButtonStyles}
`