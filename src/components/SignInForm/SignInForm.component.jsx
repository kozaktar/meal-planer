import React from 'react';
import CustomButton from '../custom-button/cutom-button'
import {Form, SeparatorSpan} from './SignInForm.styles';
import FormInput from '../../components/formInput/form-input.component'

class SignInForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };


    render(){
        return(
         <Form onSubmit={this.handleSubmit}>
             <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <CustomButton type='submit' SignIn>Sign In</CustomButton>
          <SeparatorSpan>Or</SeparatorSpan>
          <CustomButton GoogleSignIn>Sign In With Google</CustomButton>
        </Form>
            )
    }

}
export default SignInForm;