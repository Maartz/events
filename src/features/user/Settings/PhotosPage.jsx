import React, {Component} from 'react';
import {Image, Icon, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class PhotosPage extends Component {
    state = {
        files: [],
        fileName: '',
        cropResult: null,
        image: {}
    }

    onDrop = (files) => {
        this.setState({
            files,
            fileName: files[0].name
        })
    };

    cropImage = () => {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image: blob
            })
        }, 'image/jpeg');
    };

    render() {
        return (
            <Segment>
                <Header dividing size='large' content='Mes photos'/>
                <Grid>
                    <Grid.Row/>
                    <Grid.Column width={4}>
                        <Header style={{color: '#53f'}} sub content='Étape 1 - Ajouter une photo'/>
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                            <div style={{color: '#53f', paddingTop: '30px', textAlign: 'center'}}>
                                <Icon name='upload' size='huge'/>
                                <Header style={{color: '#53f'}}
                                        content='Déposez une image ici ou cliquez pour ajouter'/>
                            </div>
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        <Header sub style={{color: '#53f'}} content='Étape 2 - Redimensionner'/>
                        {this.state.files[0] &&
                        <Cropper
                            style={{height: 200, width: '100%'}}
                            ref='cropper'
                            src={this.state.files[0].preview}
                            aspectRatio={1}
                            viewMode={0}
                            dragMode='move'
                            guides={false}
                            scalable={true}
                            cropBoxMovable={true}
                            cropBoxResizable={true}
                            crop={this.cropImage}
                        />}
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        <Header sub style={{color: '#53f'}} content='Étape 3 - Aperçu et upload'/>
                        {this.state.files[0] &&
                        <Image style={{minHeight: '200px', minWidth: '200px'}} src={this.state.cropResult}/>
                        }
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