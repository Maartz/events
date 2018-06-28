import React from 'react'
import {Grid, Card, Header, Image, Menu, Segment} from "semantic-ui-react";
import {Emoji} from "emoji-mart";


const UserDetailedEvents = () => {
    return (
        <Grid.Column width={12}>
            <Segment attached>
                <Header>
                    <Emoji emoji='date' size={25} native /> Events
                </Header>
                <Menu secondary pointing>
                    <Menu.Item name='Tous les Events' active/>
                    <Menu.Item name='Anciens Events'/>
                    <Menu.Item name='Futurs Events'/>
                    <Menu.Item name='Events Crées'/>
                </Menu>

                <Card.Group itemsPerRow={5}>

                    <Card>
                        <Image src={'/assets/categoryImages/drinks.jpg'}/>
                        <Card.Content>
                            <Card.Header textAlign='center'>
                                Event Title
                            </Card.Header>
                            <Card.Meta textAlign='center'>
                                28th March 2018 at 10:00 PM
                            </Card.Meta>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Image src={'/assets/categoryImages/drinks.jpg'}/>
                        <Card.Content>
                            <Card.Header textAlign='center'>
                                Event Title
                            </Card.Header>
                            <Card.Meta textAlign='center'>
                                28th March 2018 at 10:00 PM
                            </Card.Meta>
                        </Card.Content>
                    </Card>

                </Card.Group>
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedEvents;