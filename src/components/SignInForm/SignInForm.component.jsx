import React from 'react';
import CustomButton from '../custom-button/cutom-button'
import { Form, SeparatorSpan, ButtonGroup, CreateAccountPrompt, CustomTextField } from './SignInForm.styles';
import { signInCreateAccountSwitch } from '../../redux/sign-in-modal/sign-in-modal.actions';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import {setCurrentUser, googleSignInStart} from '../../redux/user/user.actions';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import WithSpinner from '../spiner/withSpiner.component';
import { createStructuredSelector } from 'reselect';
import {selectUserLoading} from '../../redux/user/user.selectors'


const ButtonGroupWithSpinner=WithSpinner(ButtonGroup)

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
    const {userLoading, googleSignIn}=this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <CustomTextField
        id="outlined-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={this.state.email}
        onChange={this.handleChange}
        required
        disabled={userLoading}
      />
        <CustomTextField
        id="outlined-password-input"
        label="Password"
        type="password"
        name="password"
        autoComplete="password"
        margin="normal"
        variant="outlined"
        value={this.state.password}
        onChange={this.handleChange}
        required
        disabled={userLoading}
        />
          <ButtonGroupWithSpinner isLoading={userLoading}>
            <CustomButton type='submit' isLoading={userLoading} disabled={userLoading} buttonType='SignIn'>Sign In</CustomButton>
            <SeparatorSpan>Or</SeparatorSpan>
            <CustomButton  isLoading={userLoading} disabled={userLoading} buttonType='GoogleSignIn' type='button' onClick={()=>{googleSignIn()
          }} >Sign In With Google</CustomButton>
          </ButtonGroupWithSpinner>
        </Form>
        <CreateAccountPrompt>Don't Have An Account Yet?
          <CustomButton buttonType='Link' disabled={userLoading} Link onClick={this.props.switchSignInCreate}>Sign Up</CustomButton>
        </CreateAccountPrompt>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  switchSignInCreate: () => dispatch(signInCreateAccountSwitch()),
  setCurrentUser: (user)=>dispatch(setCurrentUser(user)),
  toggleDropdown: ()=>dispatch(toggleDropdown()),
  googleSignIn: ()=>dispatch(googleSignInStart())
})

const mapStateToProps=createStructuredSelector(
  {
    userLoading:selectUserLoading
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);