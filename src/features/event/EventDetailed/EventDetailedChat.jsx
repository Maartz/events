import React, {Component} from 'react'
import {Comment, Header, Segment} from "semantic-ui-react";
import EventDetailedChatForm from "./EventDetailedChatForm";
import {Link} from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';


class EventDetailedChat extends Component {

    state = {
        showReplyForm: false,
        selectedCommentId: null
    };

    handleOpenShowReplyForm = (id) => () => {
        this.setState({
            showReplyForm: true,
            selectedCommentId: id
        })
    };

    handleCloseReplyForm = () => {
        this.setState({
            showReplyForm: false,
            selectedCommentId: null
        })
    };

    render() {

        const {addEventComment, eventId, eventChat} = this.props;
        const {showReplyForm, selectedCommentId} = this.state;
        const locale = require('date-fns/locale/fr');

        return (
            <div className='shadow'>
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
                                        <div> Il y a {distanceInWords(comment.date, Date.now(), {locale: locale})}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.text}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action
                                            onClick={this.handleOpenShowReplyForm(comment.id)}
                                        >Répondre
                                        </Comment.Action>
                                        {showReplyForm && selectedCommentId === comment.id && (
                                            <EventDetailedChatForm
                                                addEventComment={addEventComment}
                                                eventId={eventId}
                                                form={`reply_${comment.id}`}
                                                closeForm={this.handleCloseReplyForm}
                                                parentId={comment.id}
                                            />
                                        )}
                                    </Comment.Actions>
                                </Comment.Content>

                                {comment.childNodes && comment.childNodes.map(child => (
                                    <Comment.Group>
                                        <Comment key={child.id}>
                                            <Comment.Avatar src={child.photoURL || "/assets/user.png"}/>
                                            <Comment.Content>
                                                <Comment.Author as={Link}
                                                                to={`/profile/${child.uid}`}>{child.displayName}</Comment.Author>
                                                <Comment.Metadata>
                                                    <div> Il y a {distanceInWords(child.date, Date.now(), {locale: locale})}</div>
                                                </Comment.Metadata>
                                                <Comment.Text>{child.text}</Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action
                                                        onClick={this.handleOpenShowReplyForm(child.id)}
                                                    >Répondre
                                                    </Comment.Action>
                                                    {showReplyForm && selectedCommentId === child.id && (
                                                        <EventDetailedChatForm
                                                            addEventComment={addEventComment}
                                                            eventId={eventId}
                                                            form={`reply_${child.id}`}
                                                            closeForm={this.handleCloseReplyForm}
                                                            parentId={child.parentId}
                                                        />
                                                    )}
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                    </Comment.Group>
                                ))}


                            </Comment>
                        ))}
                    </Comment.Group>
                    <EventDetailedChatForm
                        parentId={0}
                        addEventComment={addEventComment}
                        eventId={eventId}
                        form={'newComment'}
                    />
                </Segment>
            </div>
        )
    }

}

export default EventDetailedChat