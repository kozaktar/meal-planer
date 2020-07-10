import React from 'react';
import Button from '@material-ui/core/Button';
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
            <Button disabled={userLoading}  onClick={()=>{emailSignIn(email, password); history.push('/auth')}} variant="contained" color="primary">Sign In</Button>
            <SeparatorSpan>Or</SeparatorSpan>
            <Button variant="contained" color="secondary" onClick={()=>{googleSignIn(); history.push('/auth')}
          } >Sign In With Google</Button>
          </ButtonGroupWithSpinner>
        </Form>
        <CreateAccountPrompt>Don't Have An Account Yet?
          <Button  disabled={userLoading} onClick={this.props.switchSignInCreate}>Sign Up</Button>
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