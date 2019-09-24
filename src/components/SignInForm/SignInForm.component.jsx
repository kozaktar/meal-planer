import React from 'react';
import CustomButton from '../custom-button/cutom-button'
import { Form, SeparatorSpan, ButtonGroup, CreateAccountPrompt } from './SignInForm.styles';
import FormInput from '../../components/formInput/form-input.component';
import { signInCreateAccountSwitch } from '../../redux/sign-in-modal/sign-in-modal.actions';
import { connect } from 'react-redux';
import { signInWithGoogle, auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import {setCurrentUser} from '../../redux/user/user.actions';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    const{email, password}=this.state;
    const {setCurrentUser, toggleDropdown}=this.props;
    
    try{
      const {user}=await auth.signInWithEmailAndPassword(email,password);
      const logedUser=await createUserProfileDocument(user);
      this.setState({ email: '', password: '' });

      setCurrentUser(logedUser);
      toggleDropdown();

    }
    catch(error){
      console.error(error);
    }
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };


  render() {
    return (
      <div>
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
          <ButtonGroup>
            <CustomButton type='submit' SignIn>Sign In</CustomButton>
            <SeparatorSpan>Or</SeparatorSpan>
            <CustomButton GoogleSignIn type='button' onClick={signInWithGoogle}>Sign In With Google</CustomButton>
          </ButtonGroup>
        </Form>
        <CreateAccountPrompt>Don't Have An Account Yet?<CustomButton Link onClick={this.props.switchSignInCreate}>Sign Up.</CustomButton></CreateAccountPrompt>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  switchSignInCreate: () => dispatch(signInCreateAccountSwitch()),
  setCurrentUser: (user)=>dispatch(setCurrentUser(user)),
  toggleDropdown: ()=>dispatch(toggleDropdown())
})

export default connect(null, mapDispatchToProps)(SignInForm);