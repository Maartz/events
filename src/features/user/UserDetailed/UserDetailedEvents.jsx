import React from 'react'
import {Grid, Card, Header, Image, Menu, Segment, Tab} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {Emoji} from "emoji-mart";
import format from 'date-fns/format';

const panes = [
    {menuItem: 'Tous les Events', pane: {key: 'allEvents'}},
    {menuItem: 'Anciens Events', pane: {key: 'pastEvents'}},
    {menuItem: 'Futurs Events', pane: {key: 'futureEvents'}},
    {menuItem: 'Events Crées', pane: {key: 'hosted'}},
];


const UserDetailedEvents = ({events, eventsLoading, changeTab}) => {
    return (
        <Grid.Column width={12}>
            <Segment attached loading={eventsLoading}>
                <Header>
                    <Emoji emoji='date' size={25} native/> Events
                </Header>
                <Tab
                    onTabChange={(evt, data) => changeTab(evt, data)}
                    panes={panes}
                    menu={{secondary: true, pointing: true}}/>
                <br/>

                <Card.Group itemsPerRow={5}>
                    {events && events.map((event => (
                        <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                            <Image src={`/assets/categoryImages/${event.category}.jpg`}/>
                            <Card.Content>
                                <Card.Header textAlign='center'>
                                    {event.title}
                                </Card.Header>
                                <Card.Meta textAlign='center'>
                                    <div>
                                        {format(event.date && event.date.toDate(), 'DD MMMM YYYY')}
                                        {format(event.date && event.date.toDate(), 'HH:mm')}
                                    </div>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    )))}
                </Card.Group>
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedEvents;