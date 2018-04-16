import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit = ({email, password}) => {
        this.props.signupUser({email, password});
    }

    renderAlert = () => {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger" >
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" {...email} />
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" {...password} />
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" className="form-control" {...passwordConfirm} />
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

const validate = ({email, password, passwordConfirm}) => {
    const errors = {};

    if (!email) {
        errors.email = "Please enter an email";
    }

    if (!password) {
        errors.password = "Please enter a password";
    }

    if (!passwordConfirm) {
        errors.passwordConfirm = "Please confirm your password";
    }

    if (password !== passwordConfirm) {
        errors.password = "Passwords must match!";
    }
    return errors;
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, 
state => ({ errorMessage: state.auth.error }),
actions)(Signup);