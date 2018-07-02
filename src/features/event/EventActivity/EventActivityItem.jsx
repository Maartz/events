import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class EventActivityItem extends Component {
    renderSummary = activity => {
        switch (activity.type) {
            case 'newEvent':
                return (
                    <div>
                        Nouvel Event!{' '} <br/>
                        <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
                            {activity.hostedBy}
                        </Feed.User>{' '}
                        organise <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
                    </div>
                );
            case 'cancelledEvent':
                return (
                    <div>
                        Event Annulé!{' '} <br/>
                        <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
                            {activity.hostedBy}
                        </Feed.User>{' '}
                        a annulé <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
                    </div>
                );
            default:
                return;
        }
    };

    render() {
        const { activity } = this.props;
        const locale = require('date-fns/locale/fr');

        return (
            <Feed.Event>
                <Feed.Label>
                    <img src={activity.photoURL || '/assets/user.png'} alt="" />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
                    <Feed.Meta>
                        <Feed.Date>Il y a {distanceInWordsToNow(activity.timestamp.toDate(), {locale: locale})}</Feed.Date>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default EventActivityItem;
