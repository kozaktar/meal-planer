import React from 'react'
import { Form, CreateAccountPrompt, CustomTextField} from '../SignInForm/SignInForm.styles';
import CustomButton from '../../components/custom-button/cutom-button';
import { signInCreateAccountSwitch } from '../../redux/sign-in-modal/sign-in-modal.actions';
import { connect } from 'react-redux';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import {signUpStart} from '../../redux/user/user.actions';

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
        console.log('hello')
        const {startSignUp}=this.props
        const {displayName, email, confirmEmail, password, confirmPassword}=this.state;
        event.preventDefault()
        startSignUp(email,confirmEmail,password,confirmPassword, displayName);
        

    }

    render() {
        const {displayName, email, confirmEmail, password, confirmPassword}=this.state;
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
                    />
                    <CustomButton style={{display:'block'}} buttonType='SignIn' type="submit">Sign Up</CustomButton>
                </Form>
                <CreateAccountPrompt>Already Have An Account?<CustomButton buttonType='Link' onClick={this.props.switchSignInCreate}>Log In.</CustomButton></CreateAccountPrompt>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    switchSignInCreate: () => dispatch(signInCreateAccountSwitch()),
    startSignUp: (email, confirmEmail,password, confirmPassword, userName)=>dispatch(signUpStart(email, confirmEmail,password, confirmPassword, userName))
})

export default connect(null, mapDispatchToProps)(SignUpFrom);