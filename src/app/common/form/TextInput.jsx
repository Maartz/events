import React from 'react'
import {Form, Label} from 'semantic-ui-react';

/**
 *
 * @param input
 * @param width
 * @param type
 * @param placeholder
 * @param touched
 * @param error
 * @returns {*}
 * @constructor
 */
const TextInput = ({input, width, type, placeholder, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <input {...input} placeholder={placeholder} type={type}/>

            {touched && error && <div>
                <br/>
                <Label color='red'>{error}</Label>
            </div>}
        </Form.Field>
    )
};

export default TextInput;