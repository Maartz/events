/*global google*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Script from 'react-load-script';
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import {Form, Segment, Button, Grid, Header} from "semantic-ui-react";
import {cancelToggle, createEvent, updateEvent} from "../EventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import {withFirestore} from "react-redux-firebase";

/**
 *
 * @param state
 * @returns {{initialValues, event}}
 */
const mapState = (state) => {

    /**
     *
     * @type {{}}
     */
    let event = {};

    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0]
    }

    return {
        initialValues: event,
        event,
        loading: state.async.loading
    }
};

/**
 *
 * @type {{createEvent: createEvent, updateEvent: updateEvent, cancelToggle: cancelToggle}}
 */
const actions = {
    createEvent,
    updateEvent,
    cancelToggle
};

/**
 *
 * @type {*[]}
 */
const category = [
    {key: 'outing', text: 'Sortie', value: 'Sortie'},
    {key: 'culture', text: 'Culture', value: 'Culture'},
    {key: 'film', text: 'Film', value: 'Film'},
    {key: 'food', text: 'Nourriture', value: 'Nourriture'},
    {key: 'music', text: 'Musique', value: 'Musique'},
    {key: 'travel', text: 'Voyage', value: 'Voyage'},
    {key: 'game', text: 'Jeux Vidéo', value: 'Jeux vidéo'},
    {key: 'sport', text: 'Sport', value: 'Sport'},
    {key: 'computer', text: 'Informatique', value: 'Informatique'},
    {key: 'art', text: 'Art', value: 'Art'},
    {key: 'book', text: 'Lecture', value: 'Lecture'},
    {key: 'danse', text: 'Danse', value: 'Danse'}
];

const validate = combineValidators({
    title: isRequired({message: 'Votre Events doit avoir un titre'}),
    category: isRequired({message: 'Vous devez renseigner une catégorie'}),
    description: composeValidators(
        isRequired({message: 'Parlez nous un peu de votre Events ;) '}),
        hasLengthGreaterThan(4)({message: 'Moins de 5 caractères ??'})
    )(),
    city: isRequired({message: 'Il faut bien que ça ce passe quelque part …'}),
    venue: isRequired({message: 'Où est ce que ça ce passe ?'}),
    date: isRequired({message: 'On vas bien prévoir ça un jour, non ?'})
});

class EventForm extends Component {

    /**
     *
     * @type {{cityLatLng: {}, venueLatLng: {}, scriptLoaded: boolean}}
     */
    state = {
        cityLatLng: {},
        venueLatLng: {},
        scriptLoaded: false
    };

    // Listen to change asyn on firestore events
    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const {firestore, match} = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    // Kill listening from previous method
    /**
     *
     * @returns {Promise<void>}
     */
    async componentWillUnmount() {
        const {firestore, match} = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }

    /**
     *
     * @returns {void|*}
     */
    handleScriptLoaded = () => this.setState({scriptLoaded: true});

    /**
     *
     * @param selectedCity
     */
    handleCitySelect = (selectedCity) => {
        geocodeByAddress(selectedCity)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    cityLatLng: latLng
                });
            })
            .then(() => {
                this.props.change('city', selectedCity)
            })
    };

    /**
     *
     * @param selectedVenue
     */
    handleVenueSelect = (selectedVenue) => {
        geocodeByAddress(selectedVenue)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    venueLatLng: latLng
                });
            })
            .then(() => {
                this.props.change('venue', selectedVenue)
            })
    };

    /**
     *
     * @param values
     */
    onFormSubmit = async values => {
        values.venueLatLng = this.state.venueLatLng;
        if (this.props.initialValues.id) {
            if(Object.keys(values.venueLatLng).length === 0){
                values.venueLatLng = this.props.event.venueLatLng
            }
            await this.props.updateEvent(values);
            this.props.history.goBack();
        } else {

            this.props.createEvent(values);
            this.props.history.push('/events');
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {

        const {loading, invalid, submitting, pristine, event, cancelToggle } = this.props;
        return (
            <Grid>
                <Script
                    url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOLlCya2h2sNa763MsnQR2CQu7mXkQvA&libraries=places'
                    onLoad={this.handleScriptLoaded}
                />
                <Grid.Column width={10}>
                    <Segment>
                        <Header as='h1' style={{color: '#53f'}} content="Details de l'Events "/>
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                            <Field
                                name='title'
                                type='text'
                                component={TextInput}
                                placeholder="Comment s'appelle votre Events ?"
                            />
                            <Field
                                name='category'
                                type='text'
                                component={SelectInput}
                                options={category}
                                placeholder="Quelle est le sujet de votre Events"
                            />
                            <Field
                                name='description'
                                type='text'
                                rows={3}
                                component={TextArea}
                                placeholder='Une petite description ?'
                            />
                            <Header as='h1' style={{color: '#53f'}} content='Détails sur le lieu'/>
                            <Field
                                name='city'
                                type='text'
                                component={PlaceInput}
                                options={{types: ['(cities)']}}
                                placeholder='Ville'
                                onSelect={this.handleCitySelect}
                            />
                            {this.state.scriptLoaded &&
                            <Field
                                name='venue'
                                type='text'
                                component={PlaceInput}
                                options={{
                                    location: new google.maps.LatLng(this.state.cityLatLng),
                                    radius: 1000,
                                    types: ['establishment']
                                }}
                                placeholder='Établissement'
                                onSelect={this.handleVenueSelect}
                            />}
                            <Field
                                name='date'
                                type='date'
                                dateFormat='DD-MM-YYYY HH:mm'
                                timeFormat='HH:mm'
                                showTimeSelect
                                component={DateInput}
                                placeholder="Date et heure de l'évènement"
                            />

                            <Button
                                loading={loading}
                                disabled={invalid || submitting || pristine}
                                type="submit"
                                style={{backgroundColor: '#53f', color: 'white'}}
                            >
                                Envoyer
                            </Button>
                            <Button
                                disabled={loading}
                                onClick={this.props.history.goBack}
                                type="button">
                                Annuler
                            </Button>
                            {event.id &&
                            <Button
                                onClick={() => cancelToggle(!event.cancelled, event.id) }
                                type='button'
                                color={event.cancelled ? 'green' : 'red'}
                                floated='right'
                                content={event.cancelled ? "Activer l'Events" : "Annuler l'Events"}
                            />}
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withFirestore(connect(mapState, actions)(reduxForm({
    form: 'eventForm',
    enableReinitialize: true, validate
})(EventForm)));