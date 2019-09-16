import React from 'react'
import { Form, CreateAccountPrompt } from '../SignInForm/SignInForm.styles';
import FormInput from '../formInput/form-input.component';
import CustomButton from '../../components/custom-button/cutom-button';
import { signInCreateAccountSwitch } from '../../redux/sign-in-modal/sign-in-modal.actions';
import { connect } from 'react-redux';


class SignUpFrom extends React.Component {

    constructor(props) {
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

    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        handleChange={this.handleChange}
                        value={this.state.displayName}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='email'
                        required
                    />
                    <FormInput
                        name='confirmEmail'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.confirmEmail}
                        label='confirm your email'
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
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={this.state.confirmPassword}
                        handleChange={this.handleChange}
                        label='confirm your password'
                        required
                    />
                    <CustomButton SignIn type="submit">Sign Up</CustomButton>
                </Form>
                <CreateAccountPrompt>Already Have An Account?<CustomButton Link onClick={this.props.switchSignInCreate}>Log In.</CustomButton></CreateAccountPrompt>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    switchSignInCreate: () => dispatch(signInCreateAccountSwitch())
})

export default connect(null, mapDispatchToProps)(SignUpFrom);