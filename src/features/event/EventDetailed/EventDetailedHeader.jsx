import React from 'react'
import format from 'date-fns/format';
import {Button, Header, Image, Item, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {Emoji} from "emoji-mart";

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const EventDetailedHeader = ({event, isGoing, isHost, goingToEvent, cancelGoingToEvent}) => {
    const locale = require('date-fns/locale/fr');
    let eventDate;
    if(event.date){
        eventDate = event.date.toDate();
    }
    return (
        <Segment.Group>
            <Segment basic attached="top" style={{padding: '0'}}>
                <Image
                    src={`/assets/categoryImages/${event.category}.jpg`}
                    fluid
                    style={eventImageStyle}
                />
                <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={event.title}
                                    style={{color: 'white'}}
                                />
                                <p>Le {format(eventDate, 'dddd D MMMM', {locale: locale})}</p>
                                <p>
                                    Organisé par <strong>{event.hostedBy}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                {!isHost &&
                    <div>
                        {isGoing ?
                            <Button
                                onClick={()=>cancelGoingToEvent(event)}
                            >
                                Annulé ma place
                            </Button>
                            :
                            <Button
                                onClick={() => goingToEvent(event)}
                                animated='fade'
                                style={{backgroundColor: '#53f', color : '#FFF'}}
                            >
                                <Button.Content visible>
                                    Rejoindre cet Events
                                </Button.Content>
                                <Button.Content hidden>
                                    <Emoji emoji='ok_hand' size={20} native/>
                                </Button.Content>
                            </Button>
                        }
                    </div>
                }
                {isHost &&
                <Button as={Link} to={`/manage/${event.id}`} color="orange">
                    Gérer mon Events
                </Button>
                }
            </Segment>
        </Segment.Group>
    )
};

export default EventDetailedHeader