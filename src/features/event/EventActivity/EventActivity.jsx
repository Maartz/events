import React from 'react'
import {Header, Segment, Feed, Sticky} from 'semantic-ui-react'
import EventActivityItem from './EventActivityItem'


const EventActivity = ({activities, contextRef}) => {
    return (
        <Sticky context={contextRef} offset={100}>
            <div className='shadow'>
                <Header attached='top' content='Activités récentes'/>
                <Segment attached>
                    <Feed>
                        {activities && activities.map((activity) => (
                            <EventActivityItem key={activity.id} activity={activity}/>
                        ))}
                    </Feed>
                </Segment>
            </div>
        </Sticky>
    )
};

export default EventActivity
