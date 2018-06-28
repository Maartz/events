import React from 'react'
import {Header, Segment, Grid, Image} from "semantic-ui-react";
import {Emoji} from "emoji-mart";
import LazyLoad from 'react-lazyload';

const UserDetailedPhoto = ({photos}) => {
    return (
        <Grid.Column width={12}>
            <Segment attached>
                <Header>
                    <Emoji emoji='camera' size={25} native/> Photos
                </Header>

                <Image.Group size='small'>
                    {photos &&
                        photos.map(photo => (
                            <LazyLoad
                                key={photo.id}
                                height={150}
                                placeholder={<Image src="/assets/user.png"/>}
                            >
                                <Image src={photo.url} />
                            </LazyLoad>
                        ))}
                </Image.Group>
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedPhoto