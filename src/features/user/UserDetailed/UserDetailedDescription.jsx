import React from 'react'
import format from 'date-fns/format';
import {Grid, Header, Item, List, Segment} from "semantic-ui-react";
import {Emoji} from "emoji-mart";

const UserDetailedDescription = ({profile}) => {

    let createdAt;
    if (profile.createdAt) {
        createdAt = format(profile.createdAt.toDate(), 'D MMMM YYYY');
    }

    return (
        <Grid.Column width={12}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Header>
                            <Emoji emoji='mag' size={25} native/> &nbsp;
                            À propos de {profile.displayName}
                        </Header>
                        <p>Je suis: <strong>{profile.occupation || 'Non renseigné'}</strong></p>
                        <p>Originaire de <strong>{profile.origin || 'Non renseigné'}</strong></p>
                        <p>Membre depuis : <strong>{createdAt}</strong></p>
                        <p>{profile.description}</p>

                    </Grid.Column>
                    <Grid.Column width={6}>

                        <Header>
                            <Emoji emoji='heart' size={25} native/> Intérêts
                        </Header>
                        {profile.interests ?
                            <List>
                                {profile.interests &&
                                profile.interests.map((interest, index) => (
                                    <Item key={index}>
                                        <Item.Content>
                                            <Emoji emoji='heart' size={12} native/>
                                            {interest}
                                        </Item.Content>
                                    </Item>
                                ))}
                            </List>
                            : <p>Non renseigné</p>}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Grid.Column>
    )
};

export default UserDetailedDescription