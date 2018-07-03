import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {login, socialLogin} from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";

/**
 *
 * @type {{login: login, socialLogin: socialLogin}}
 */
const actions = {
    login,
    socialLogin
};

/**
 * 
 * @param login
 * @param handleSubmit
 * @param error
 * @param socialLogin
 * @returns {*}
 * @constructor
 */
const LoginForm = ({login, handleSubmit, error, socialLogin}) => {
    return (
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
            </Segment>
        </Form>
    );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));