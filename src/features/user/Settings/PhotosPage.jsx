import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';

class PhotosPage extends Component {
    render() {
        return (
            <Segment>
                <Header dividing size='large' content='Mes photos'/>
                <Grid>
                    <Grid.Row/>
                    <Grid.Column width={4}>
                        <Header style={{color: '#53f'}} sub content='Étape 1 - Ajouter une photo'/>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        <Header sub style={{color: '#53f'}} content='Étape 2 - Redimensionner'/>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        <Header sub style={{color: '#53f'}} content='Étape 3 - Aperçu et upload'/>
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub style={{color: '#53f'}} content='Toutes les photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src='https://randomuser.me/api/portraits/men/10.jpg'/>
                        <Button style={{background: '#53f', color: '#fff'}}>Principale</Button>
                    </Card>

                    <Card>
                        <Image
                            src='https://randomuser.me/api/portraits/men/11.jpg'
                        />
                        <div className='ui two buttons'>
                            <Button
                                inverted
                                style={{color: '#53f'}}
                            >Changer</Button>
                            <Button inverted icon='trash' color='red'/>
                        </div>
                    </Card>
                </Card.Group>
            </Segment>
        );
    }
}

export default PhotosPage;