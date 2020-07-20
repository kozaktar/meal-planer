import React from 'react'
import { Form, CreateAccountPrompt, CustomTextField} from '../SignInForm/SignInForm.styles';
import Button from '@material-ui/core/Button';
import { signInCreateAccountSwitch } from '../../redux/sign-in-modal/sign-in-modal.actions';
import { connect } from 'react-redux';
import {signUpStart} from '../../redux/user/user.actions';
import WithSpinner from '../spiner/withSpiner.component';
import { createStructuredSelector } from 'reselect';
import {selectUserLoading, selectUserError} from '../../redux/user/user.selectors';

const ButtonWithSpinner=WithSpinner(Button)

class SignUpFrom extends React.Component {

    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })

    }

    handleSubmit = async event => {
        const {startSignUp}=this.props
        const {displayName, email, confirmEmail, password, confirmPassword}=this.state;
        event.preventDefault()
        startSignUp(email,confirmEmail,password,confirmPassword, displayName);
        

    }

    render() {
        const {displayName, email, confirmEmail, password, confirmPassword}=this.state;
        const {userLoading}=this.props;

        return (
            <div style={{maxWidth:"500px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <CustomTextField
                        label="Display Name"
                        type="text"
                        name="displayName"
                        margin="normal"
                        variant="outlined"
                        value={displayName}
                        onChange={this.handleChange}
                        required
                        disabled={userLoading}
                    />
                    <CustomTextField
                        label="Email"
                        type="email"
                        name="email"
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={this.handleChange}
                        required
                        disabled={userLoading}
                    />
                    <CustomTextField
                        label="Confirm Email"
                        type="email"
                        name="confirmEmail"
                        margin="normal"
                        variant="outlined"
                        value={confirmEmail}
                        onChange={this.handleChange}
                        required
                        disabled={userLoading}
                    />
                    <CustomTextField
                         label="Passowrd"
                         type="password"
                         name="password"
                         margin="normal"
                         variant="outlined"
                         value={password}
                         onChange={this.handleChange}
                         required
                         disabled={userLoading}
                    />
                    <CustomTextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        margin="normal"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                        disabled={userLoading}
                    />

                    <ButtonWithSpinner  buttonType='SignIn' type="submit" isloading={userLoading} variant="contained" color="primary">Sign Up</ButtonWithSpinner>
                </Form>
                <CreateAccountPrompt>Already Have An Account?<Button buttonType='Link' onClick={this.props.switchSignInCreate} disabled={userLoading}>Log In.</Button></CreateAccountPrompt>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    switchSignInCreate: () => dispatch(signInCreateAccountSwitch()),
    startSignUp: (email, confirmEmail,password, confirmPassword, userName)=>dispatch(signUpStart(email, confirmEmail,password, confirmPassword, userName))
})

const mapStateToProps=createStructuredSelector(
    {
      userLoading:selectUserLoading,
      userLoginError:selectUserError
    }
  )

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFrom);