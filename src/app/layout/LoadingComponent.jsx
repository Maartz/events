import React from 'react'
import {Dimmer, Loader} from 'semantic-ui-react';

/**
 *
 * @param inverted
 * @returns {*}
 * @constructor
 */
const LoadingComponent = ({inverted}) => {
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content="Chargement..."/>
        </Dimmer>
    )
};

export default LoadingComponent