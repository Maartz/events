import React from 'react'
import {Form, Label, Select} from 'semantic-ui-react'

/**
 *
 * @param input
 * @param type
 * @param placeholder
 * @param multiple
 * @param options
 * @param touched
 * @param error
 * @returns {*}
 * @constructor
 */
const SelectInput = ({input, type, placeholder, multiple, options, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error}>
            <Select
                value={input.value || null}
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
                multiple={multiple}
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
};

export default SelectInput