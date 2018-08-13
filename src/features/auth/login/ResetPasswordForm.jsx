import React from 'react';
import { connect } from 'react-redux'
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {resetPassword} from "../authActions";

/**
 *
 * @type {{resetPassword: resetPassword}}
 */
const actions = {
    resetPassword
};

/**
 *
 * @param resetPassword
 * @param handleSubmit
 * @param error
 * @returns {*}
 * @constructor
 */
const ResetPasswordForm = ({resetPassword, handleSubmit, error}) => {
    return (
        <Form size="large" onSubmit={handleSubmit(resetPassword)}>
            <Segment>
                <Field
                    name="email"
                    component={TextInput}
                    type="text"
                    placeholder="Adresse e-mail"
                />
                {error && <div>
                    <Label color='red'>{error}</Label>
                    <br/><br/>
                </div>}
                <Button fluid size="large" style={{backgroundColor: '#4e3ef5', color: 'white'}}>
                    Confirmer
                </Button>
            </Segment>
        </Form>
    );
};

export default connect(null, actions)(reduxForm({form: 'resetPasswordForm'})(ResetPasswordForm));