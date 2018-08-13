import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {login, socialLogin} from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";
import {openModal} from "../../modals/ModalActions";

/**
 *
 * @type {{login: login, socialLogin: socialLogin}}
 */
const actions = {
    login,
    socialLogin,
    openModal
};

/**
 * 
 * @param login
 * @param handleSubmit
 * @param error
 * @param socialLogin
 * @param resetPassword
 * @returns {*}
 * @constructor
 */
const LoginForm = ({login, handleSubmit, error, socialLogin, openModal}) => {

    const handlePasswordReset = () => {
        openModal('ResetPasswordModal');
    };

    return (
        <div>
            <Form size="large" onSubmit={handleSubmit(login)}>
                <Segment>
                    <Field
                        name="email"
                        component={TextInput}
                        type="text"
                        placeholder="Adresse e-mail"
                    />
                    <Field
                        name="password"
                        component={TextInput}
                        type="password"
                        placeholder="Mot de passe"
                    />
                    {error && <div>
                        <Label color='red'>{error}</Label>
                        <br/><br/>
                    </div>}
                    <Button fluid size="large" style={{backgroundColor: '#4e3ef5', color: 'white'}}>
                        Connexion
                    </Button>
                    <Divider horizontal>
                        Ou
                    </Divider>
                    <SocialLogin socialLogin={socialLogin}/>
                    <br/>
                </Segment>
            </Form>
            <Button onClick={handlePasswordReset} fluid size="small" style={{backgroundColor: 'white', color: '#4e3ef5'}} content="Mot de passe oublié"/>
        </div>
    );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));