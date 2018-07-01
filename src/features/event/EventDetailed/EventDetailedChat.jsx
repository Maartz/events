import React from 'react'
import {Comment, Header, Segment} from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import {Link} from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';

const EventDetailedChat = ({addEventComment, eventId, eventChat}) => {
    return (
        <div>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                style={{border: 'none', color: '#fff', backgroundColor: '#53f'}}
            >
                <Header>Zone de discussion</Header>
            </Segment>

            <Segment attached>
                <Comment.Group>
                    {eventChat && eventChat.map((comment) => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.photoURL || "/assets/user.png"}/>
                            <Comment.Content>
                                <Comment.Author as={Link}
                                                to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div> Il y a {distanceInWords(comment.date, Date.now())}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
                <EventDetailedChatForm
                    addEventComment={addEventComment}
                    eventId={eventId}
                />
            </Segment>
        </div>
    )
};

export default EventDetailedChat