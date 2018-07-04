import React from 'react'
import {Form, Radio} from 'semantic-ui-react'

/**
 *
 * @param input
 * @param width
 * @param type
 * @param label
 * @returns {*}
 * @constructor
 */
const RadioInput = ({input, width, type, label}) => {
    return (
        <Form.Field>
            <div className="ui radio">
                <input {...input} type={type}/>{' '}
                <label>{label}</label>
            </div>
        </Form.Field>
    )
}

export default RadioInput