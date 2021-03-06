import React, {Component} from 'react'
import {Form, Label} from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

/**
 *
 * @type {{autocompleteContainer: {zIndex: number}}}
 */
const styles = {
    autocompleteContainer: {
        zIndex: 1000
    }
};

class PlaceInput extends Component {
    /**
     *
     * @type {{scriptLoaded: boolean}}
     */
    state = {
        scriptLoaded: false
    };

    /**
     *
     * @returns {void|*}
     */
    handleScriptLoaded = () => this.setState({scriptLoaded: true});

    /**
     *
     * @returns {*}
     */
    render() {
        const {input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props;
        return (
            <Form.Field
                error={touched && !!error}
                width={width}
            >
                <Script
                    url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDXOLlCya2h2sNa763MsnQR2CQu7mXkQvA&libraries=places'
                    onLoad={this.handleScriptLoaded}
                />
                {this.state.scriptLoaded &&
                <PlacesAutocomplete
                    inputProps={{...input, placeholder}}
                    options={options}
                    onSelect={onSelect}
                    styles={styles}
                />}
                {touched && error && <Label basic color='red'>{error}</Label>}
            </Form.Field>
        );
    }

}

export default PlaceInput;