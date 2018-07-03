import React, {Component} from 'react'
import format from 'date-fns/format';
import {Button, Grid, Segment} from "semantic-ui-react";
import EventDetailedMap from './EventDetailedMap';
import {Emoji} from "emoji-mart";

class EventDetailedInfo extends Component {
    /**
     *
     * @type {{showMap: boolean}}
     */
    state = {
        showMap: false
    };

    componentWillUnmount() {
        this.setState({
            showMap: false
        })
    }

    showMapToggle = () => {
        this.setState(prevState => ({
            showMap: !prevState.showMap
        }))
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {event} = this.props;
        const locale = require('date-fns/locale/fr');
        let eventDate;
        if(event.date){
            eventDate = event.date.toDate();
        }
        return (
            <Segment.Group>
                <Segment attached="top">
                    <Grid>
                        <Grid.Column width={1}>
                            <Emoji set='google' emoji='information_source' size={25}/>
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>{event.description}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Emoji native emoji='date' size={25}/>
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <span>Le {
                                format(eventDate, 'dddd D MMMM', {locale: locale})} à {format(eventDate, 'H:mm', {locale: locale})}
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Emoji native emoji='round_pushpin' size={25}/>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <span>{event.venue}</span>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button onClick={this.showMapToggle} color="blue" size="tiny" content={this.state.showMap ? 'Cacher la carte' : 'Montrer la carte'}/>
                        </Grid.Column>
                    </Grid>
                </Segment>
                {this.state.showMap &&
                <EventDetailedMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng}/>
                }
            </Segment.Group>
        );
    }
}

export default EventDetailedInfo