import React from 'react'
import {Button, Segment, Grid} from "semantic-ui-react";
import {Emoji} from "emoji-mart";
import {Link} from "react-router-dom";


/**
 *
 * @param isCurrentUser
 * @param profile
 * @param followUser
 * @param isFollowing
 * @param unFollowUser
 * @returns {*}
 * @constructor
 */
const UserDetailedSidebar = ({isCurrentUser, profile, followUser, isFollowing, unFollowUser}) => {
    return (
        <Grid.Column width={4}>
            <Segment>
                {isCurrentUser && (
                    <Button style={{background: '#fff', color: '#53f'}} fluid animated='fade'>
                        <Button.Content visible>Modifier profil</Button.Content>
                        <Button.Content as={Link} to='/settings' hidden>
                            <Emoji emoji='lower_left_ballpoint_pen' size={25} native/>
                        </Button.Content>
                    </Button>
                )}

                {!isCurrentUser && !isFollowing && (
                    <Button style={{background: '#fff', color: '#53f'}} fluid animated='fade'>
                        <Button.Content visible>Suivre</Button.Content>
                        <Button.Content onClick={() => followUser(profile)} hidden>
                            <Emoji emoji='sunglasses' size={25} native/>
                        </Button.Content>
                    </Button>
                )}

                {!isCurrentUser && isFollowing && (
                    <Button style={{background: '#fff', color: '#53f'}} fluid animated='fade'>
                        <Button.Content visible>Ne plus suivre</Button.Content>
                        <Button.Content onClick={() => unFollowUser(profile)} hidden>
                            <Emoji emoji='wave' size={25} native/>
                        </Button.Content>
                    </Button>
                )}
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedSidebar