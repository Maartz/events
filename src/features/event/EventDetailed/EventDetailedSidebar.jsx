import React from 'react'
import {Item, Label, List, Segment} from "semantic-ui-react";
import {Link} from 'react-router-dom';

/**
 *
 * @param attendees
 * @returns {*}
 * @constructor
 */
const EventDetailedSidebar = ({attendees}) => {
    return (
        <div className='shadow'>
            <Segment
                textAlign="center"
                style={{border: 'none', color: '#fff', backgroundColor: '#53f'}}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Personne' : 'Personnes'}
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees && attendees.map((attendee) => (
                        <Item key={attendee.id} style={{ position: 'relative' }}>
                            {attendee.host &&
                            <Label
                                style={{position: 'absolute'}}
                                color="orange"
                                ribbon="right"
                            >
                                Organisateur
                            </Label>
                            }
                            <Item.Image size="tiny" src={attendee.photoURL} />
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <Link to={`/profile/${attendee.id}`}>{attendee.displayName}</Link>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </div>
    )
};

export default EventDetailedSidebar