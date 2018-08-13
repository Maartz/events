import React from 'react';
import {Segment, Header, Form, Divider, Label, Button, Icon} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import {combineValidators, matchesField, composeValidators, isRequired, createValidator} from 'revalidate'
import TextInput from '../../../app/common/form/TextInput';


const isValidEmail = createValidator(
    message => value => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return message
        }
    },
    'Adresse email invalide'
);


const validate = combineValidators({
    newPassword1: isRequired({message: 'Entrez un nouveau mot de passe.'}),
    newPassword2: composeValidators(
        isRequired({message: 'Confirmez votre nouveau mot de passe.'}),
        matchesField('newPassword1')({message: 'Les mots de passes ne correspondent pas...'})
    )()
});

const validateEmail = combineValidators({
    newEmail1: combineValidators(
        isRequired({message: 'Entrez votre nouvelle adresse e-mail.'}),
        isValidEmail
    )(),
    newEmail2: composeValidators(
        isRequired({message: 'Confirmez votre nouvelle adresse e-mail.'}),
        matchesField('newEmail1')({message: 'Les adresses ne correspondent pas...'}),
        isValidEmail
    )()
});

const AccountPage = ({error, invalid, submitting, handleSubmit, updatePassword, providerId, deleteProfile, updateEmail}) => {
    return (
        <div>
            <Segment>
                <Header dividing size="large" content="Mon Compte"/>
                {providerId && providerId === 'password' &&
                <div>
                    <Header color="violet" sub content="Changer de mot de passe"/>
                    <p>Utiliser ce formulaire pour mettre a jour vos paramètres</p>

                    <Form onSubmit={handleSubmit(updatePassword)}>
                        <Field
                            width={8}
                            name="newPassword1"
                            type="password"
                            pointing="left"
                            inline={true}
                            component={TextInput}
                            basic={true}
                            placeholder="Nouveau mot de passe"
                        />
                        <Field
                            width={8}
                            name="newPassword2"
                            type="password"
                            inline={true}
                            basic={true}
                            pointing="left"
                            component={TextInput}
                            placeholder="Confirmation du mot de passe"
                        />
                        {error && (
                            <Label basic color="red">
                                {error}
                            </Label>
                        )}
                        <Divider/>
                        <Button
                            disabled={invalid || submitting}
                            size="large"
                            style={{backgroundColor: '#4e3ef5', color: 'white'}}
                            content="Mettre à jour"
                        />
                    </Form>
                </div>
                }

                {providerId && providerId === 'facebook.com' &&
                <div>
                    <Header color="violet" sub content="Compte Facebook"/>
                    <p>Mettre à jour vos paramètres via Facebook</p>
                    <Button type="button" color="facebook">
                        <Icon name="facebook"/>
                        Aller sur Facebook
                    </Button>
                </div>
                }
                {providerId && providerId === 'google.com' &&
                <div>
                    <Header color="violet" sub content="Compte Google Plus"/>
                    <p>Mettre à jour vos paramètres via Google Plus</p>
                    <Button type="button" color="google plus">
                        <Icon name="google plus"/>
                        Aller sur Google
                    </Button>
                </div>
                }
            </Segment>
            <Segment>
                <Header dividing size="large" content="Zone de danger"/>
                <div>
                    <Header color="violet" sub content="Supprimer mon compte"/>
                    <p>Cliquez sur ce boutton pour quitter Events…</p>
                    <Button
                        onClick={() => deleteProfile()}
                        negative
                        size="large"
                        // style={{backgroundColor: '#4e3ef5', color: 'white'}}
                        content="Supprimer"
                    />
                </div>
            </Segment>
        </div>
    );
};

export default reduxForm({form: 'account', validate})(AccountPage);