import React from 'react';
import CustomButton from '../custom-button/cutom-button'
import { Form, SeparatorSpan, ButtonGroup, CreateAccountPrompt, CustomTextField } from './SignInForm.styles';
import { signInCreateAccountSwitch } from '../../redux/sign-in-modal/sign-in-modal.actions';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import WithSpinner from '../spiner/withSpiner.component';
import { createStructuredSelector } from 'reselect';
import {selectUserLoading, selectUserError} from '../../redux/user/user.selectors';
import ErrorMessage from '../error-message/error-message';
import {withRouter} from 'react-router-dom';


const ButtonGroupWithSpinner=WithSpinner(ButtonGroup)

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };



  render() {
    const {userLoading, googleSignIn, userLoginError, emailSignIn, history}=this.props;
    const {email,password}=this.state;
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
        value={email}
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
        value={password}
        onChange={this.handleChange}
        required
        disabled={userLoading}
        />

        {userLoginError?
        <ErrorMessage>{`${userLoginError}`}</ErrorMessage>:null}

          <ButtonGroupWithSpinner isloading={userLoading}>
            <CustomButton disabled={userLoading} buttonType='SignIn' onClick={()=>{emailSignIn(email, password); history.push('/auth')}}>Sign In</CustomButton>
            <SeparatorSpan>Or</SeparatorSpan>
            <CustomButton buttonType='GoogleSignIn' type='button' onClick={()=>{googleSignIn(); history.push('/auth')}
          } >Sign In With Google</CustomButton>
          </ButtonGroupWithSpinner>
        </Form>
        <CreateAccountPrompt>Don't Have An Account Yet?
          <CustomButton buttonType='Link' disabled={userLoading} onClick={this.props.switchSignInCreate}>Sign Up</CustomButton>
        </CreateAccountPrompt>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  switchSignInCreate: () => dispatch(signInCreateAccountSwitch()),
  toggleDropdown: ()=>dispatch(toggleDropdown()),
  googleSignIn: ()=>dispatch(googleSignInStart()),
  emailSignIn: (email, password)=>dispatch(emailSignInStart(email, password))
})

const mapStateToProps=createStructuredSelector(
  {
    userLoading:selectUserLoading,
    userLoginError:selectUserError
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm));