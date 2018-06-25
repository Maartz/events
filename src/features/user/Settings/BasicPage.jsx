import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment';
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";

class BasicPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit ,updateProfile} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Mes informations'/>
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Prénom Nom'
                    />
                    <Form.Group inline>
                        <label>Genre : </label>
                        <Field
                            name='gender'
                            type='radio'
                            value='male'
                            label='Homme'
                            component={RadioInput}
                        />
                        <Field
                            name='gender'
                            type='radio'
                            value='female'
                            label='Femme'
                            component={RadioInput}
                        />
                        <Field
                            name='gender'
                            type='radio'
                            value='other'
                            label='Autre'
                            component={RadioInput}
                        />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Date de naissance'
                        dateFormat='DD-MM-YYYY'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode='select'
                        maxDate={moment().subtract(18, 'years')}
                    />
                    <Field
                        name='city'
                        placeholder='Ville'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large'
                            style={{backgroundColor: '#4e3ef5', color: 'white'}}
                            content='Mettre à jour'
                    />
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({
    form: 'userProfile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(BasicPage);