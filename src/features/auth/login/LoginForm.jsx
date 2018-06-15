import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {login} from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";

const actions = {
    login
};

const LoginForm = ({login, handleSubmit, error}) => {
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
                {error && <Label size='large' circular color='red'>{error}</Label>}
                <br/>  <br/>
                <Button fluid size="large" color="violet">
                    Connexion
                </Button>
                <Divider horizontal>
                    Ou
                </Divider>
                <SocialLogin/>
            </Segment>
        </Form>
    );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));