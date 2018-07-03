import React from 'react'
import {Segment, Icon} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

/**
 *
 * @returns {*}
 * @constructor
 */
const Marker = () => <Icon name='marker' size='big' color='red'/>;

/**
 *
 * @param lat
 * @param lng
 * @returns {*}
 * @constructor
 */
const EventDetailedMap = ({lat, lng}) => {

    /**
     *
     * @type {*[]}
     */
    const center = [lat, lng];
    /**
     *
     * @type {number}
     */
    const zoom = 14;
    return (
        <Segment attached='bottom' style={{padding : 0}}>
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDXOLlCya2h2sNa763MsnQR2CQu7mXkQvA' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <Marker
                        lat={lat}
                        lng={lng}
                    />
                </GoogleMapReact>
            </div>
        </Segment>
    )
}

export default EventDetailedMap