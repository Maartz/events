import React from 'react'
import {Grid, Header, Item, Segment} from "semantic-ui-react";
import differenceInYears from 'date-fns/difference_in_years';
import {Emoji} from "emoji-mart";

/**
 *
 * @param profile
 * @returns {*}
 * @constructor
 */
const UserDetailedHeader = ({profile}) => {

    let age;
    if(profile.dateOfBirth){
        age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
    } else {
        age = <Emoji native size={25} emoji='unicorn_face' />
    }

    return (
        <Grid.Column width={16}>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            avatar
                            size='small'
                            src={profile.photoURL || '/assets/user.png'}/>
                        <Item.Content verticalAlign='bottom'>
                            <Header as='h1'>{profile.displayName}</Header>
                            <br/>
                            <Header as='h3'>{profile.occupation}</Header>
                            <br/>
                            <Header as='h3'>{age} ans, { 'de ' + profile.city || 'Entre le clavier et la chaise'}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedHeader