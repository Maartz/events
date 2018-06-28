import React, {Component} from 'react'
import {Segment, Item, Button, List, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import format from 'date-fns/format';
import EventListAttendee from './EventListAttendee';
import {Emoji} from "emoji-mart";

class EventListItem extends Component {
    render() {
        const {event, deleteEvent} = this.props;
        const locale = require('date-fns/locale/fr');
        return (
            <div>
                <Segment.Group>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size="tiny" circular src={event.hostPhotoURL}/>
                                <Item.Content>
                                    <Item.Header as="a">{event.title}</Item.Header>
                                    <Item.Description>
                                        Organisé par <a>{event.hostedBy}</a>
                                    </Item.Description>
                                    {event.cancelled &&
                                    <Label style={{top: '-40px'}} ribbon='right' color='red'
                                           content='Cet Events à été annulé'/>}
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment>
                          <span>
                              <Emoji native emoji='date' size={15}/>
                              Le {format(event.date.toDate(), 'dddd D MMMM', {locale: locale})} à {format(event.date.toDate(), 'HH:mm')}
                              <br/><br/>
                            <Emoji native emoji='round_pushpin' size={15}/> {event.venue}
                          </span>
                    </Segment>
                    <Segment secondary>
                        <List horizontal>
                            {event.attendees && Object.values(event.attendees).map(
                                (attendee, index) => <EventListAttendee
                                    key={index}
                                    attendee={attendee}
                                />
                            )}
                        </List>
                    </Segment>
                    <Segment clearing>
                        <span>{event.description}</span>
                        <Button
                            as={Link}
                            to={`/event/${event.id}`}
                            color="teal"
                            floated="right"
                            content="View"
                        />
                        <Button
                            onClick={deleteEvent(event.id)}
                            as="a"
                            color="red"
                            floated="right"
                            content="Delete"
                        />
                    </Segment>
                </Segment.Group>
            </div>
        )
    }
}

export default EventListItem;