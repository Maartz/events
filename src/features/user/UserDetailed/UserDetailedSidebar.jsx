import React from 'react'
import {Button, Segment, Grid} from "semantic-ui-react";
import {Emoji} from "emoji-mart";
import {Link} from "react-router-dom";



const UserDetailedSidebar = ({isCurrentUser}) => {
    return (
        <Grid.Column width={4}>
            <Segment>
                {isCurrentUser ? (
                    <Button style={{background: '#fff', color: '#53f'}} fluid animated='fade'>
                        <Button.Content visible>Modifier profil</Button.Content>
                        <Button.Content as={Link} to='/settings' hidden>
                            <Emoji emoji='lower_left_ballpoint_pen' size={25} native/>
                        </Button.Content>
                    </Button>
                ) : (
                    <Button style={{background: '#fff', color: '#53f'}} fluid animated='fade'>
                        <Button.Content visible>Suivre</Button.Content>
                        <Button.Content as={Link} to='/settings' hidden>
                            <Emoji emoji='sunglasses' size={25} native/>
                        </Button.Content>
                    </Button>
                )}
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedSidebar