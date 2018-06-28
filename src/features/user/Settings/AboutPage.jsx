import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../../app/common/form/RadioInput';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';

const interests = [
    { key: 'outing', text: 'Sortie', value: 'Sortie' },
    { key: 'culture', text: 'Culture', value: 'Culture' },
    { key: 'film', text: 'Film', value: 'Film' },
    { key: 'food', text: 'Nourriture', value: 'Nourriture' },
    { key: 'music', text: 'Musique', value: 'Musique' },
    { key: 'travel', text: 'Voyage', value: 'Voyage' },
    { key: 'game', text: 'Jeux Vidéo', value: 'Jeux vidéo' },
    { key: 'sport', text: 'Sport', value: 'Sport' },
    { key: 'computer', text: 'Informatique', value: 'Informatique' },
    { key: 'art', text: 'Art', value: 'Art' },
    { key: 'book', text: 'Lecture', value: 'Lecture' },
    { key: 'danse', text: 'Danse', value: 'Danse' }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
    return (
        <Segment>
            <Header dividing size="large" content="À propos de moi" />
            <p>Completez votre profil, cela vous permettra de profitez à fond de Revents !</p>
            <Form onSubmit={handleSubmit(updateProfile)}>
                <Form.Group inline>
                    <label>Quel est votre status : </label>
                    <Field
                        name="status"
                        component={RadioInput}
                        type="radio"
                        value="single"
                        label="Célibataire"
                    />
                    <Field
                        name="status"
                        component={RadioInput}
                        type="radio"
                        value="relationship"
                        label="En couple"
                    />
                    <Field
                        name="status"
                        component={RadioInput}
                        type="radio"
                        value="married"
                        label="Marié"
                    />
                </Form.Group>
                <Divider />
                <label>Un petit mot sur vous ?</label>
                <Field name="about" component={TextArea} placeholder="A propos de moi…" />
                <Field
                    name="interests"
                    component={SelectInput}
                    options={interests}
                    value="interests"
                    multiple={true}
                    placeholder="Sélectionnez vos intérêts…"
                />
                <Field
                    width={8}
                    name="occupation"
                    type="text"
                    component={TextInput}
                    placeholder="Hobbies"
                />
                <Field
                    width={8}
                    name="origin"
                    options={{ types: ['(regions)'] }}
                    component={PlaceInput}
                    placeholder="Ville de naissance"
                />
                <Divider />
                <Button
                    disabled={pristine || submitting}
                    size="large"
                    style={{backgroundColor: '#4e3ef5', color: 'white'}}
                    content="Mettre à jour" />
            </Form>
        </Segment>
    );
};

export default reduxForm({
    form: 'userProfile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(AboutPage);