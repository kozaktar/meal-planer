import React from 'react';
import {CustomButtonContainer} from './cutom-button.styles';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const SignInButton=styled(Button)({
    color:'white',
    backgroundColor:'black',
    '&:hover':{
        backgroundColor: 'grey',
        color: 'white'
    }
})

const GoogleButton=styled(Button)({
    color:'white',
    backgroundColor:'#DB4437',
    '&:hover':{
        backgroundColor: '#DB3445',
        color: 'white'

    }
})

const LinkButton=styled(Button)(
    {
        color: 'blue',
        padding:'5',
        fontSize:'1rem',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        '&:hover':{
        color: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0)',
}   
    }
)



const CustomButton=({children, buttonType, ...props})=>{
    switch(buttonType){
        case 'SignIn':
            return( <SignInButton {...props}>
                {children}
            </SignInButton>);
        case 'GoogleSignIn':
                return( <GoogleButton {...props}>
                    {children}
                </GoogleButton>);
        case 'Link':
                return( <LinkButton {...props}>
                    {children}
                </LinkButton>);
        default:
            return (<Button {...props}>
                {children}
            </Button>)
    }
    
}
 


export default CustomButton;
