import React from 'react'
import {Form, Label} from 'semantic-ui-react'

/**
 *
 * @param input
 * @param rows
 * @param type
 * @param placeholder
 * @param touched
 * @param error
 * @returns {*}
 * @constructor
 */
const TextArea = ({input, rows, type, placeholder, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error}>
            <textarea
                {...input}
                placeholder={placeholder}
                rows={rows}/>
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
};

export default TextArea