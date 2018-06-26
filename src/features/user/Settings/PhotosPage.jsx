import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux';
import {toastr} from 'react-redux-toastr';
import {Image, Icon, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {uploadProfilImage, deletePhoto, setMainPhoto} from "../UserActions";

const query = ({auth}) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos'
        }
    ]
}

const actions = {
    uploadProfilImage,
    deletePhoto,
    setMainPhoto
};

const mapState = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
});

class PhotosPage extends Component {
    state = {
        files: [],
        fileName: '',
        cropResult: null,
        image: {}
    };

    uploadImage = async () => {
        try {
            await this.props.uploadProfilImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success('Super !', 'Votre image a été uploadé !');
        } catch (e) {
            toastr.error('Oups…', 'Quelque chose s\'est mal passé…');
            console.log(e);
        }
    };

    handlePhotoDelete = photo => async () => {
        try {
            this.props.deletePhoto(photo);
            toastr.success('POUF !!', 'Plus de photo !!')
        } catch (e) {
            toastr.error('Oups', e.message);
        }
    };

    handleSetMainPhoto = photo => async () => {
        try {
            this.props.setMainPhoto(photo);
        } catch (e) {
            console.log(e);
            toastr.error('Oups', e.message);
        }
    };

    cancelCrop = () => {
        this.setState({
            files: [],
            image: {}
        })
    };

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
        const {photos, profile, loading} = this.props;
        let filteredPhotos;
        if (photos) {
            filteredPhotos = photos.filter(photo => photo.url !== profile.photoURL);
        }
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
                        <div>
                            <Image style={{minHeight: '200px', minWidth: '200px'}} src={this.state.cropResult}/>
                            <Button.Group>
                                <Button
                                    loading={loading}
                                    onClick={this.uploadImage}
                                    style={{
                                        background: '#53f',
                                        color: '#fff',
                                        width: '100px'}}
                                    icon='check'/>
                                <Button
                                    disabled={loading}
                                    onClick={this.cancelCrop}
                                    style={{width: '100px'}}
                                    icon='close'
                                />
                            </Button.Group>
                        </div>
                        }
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub style={{color: '#53f'}} content='Toutes les photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src={profile.photoURL || '/assets/user.png'}/>
                        <Button style={{background: '#53f', color: '#fff'}}>Actuel</Button>
                    </Card>
                    {photos && filteredPhotos.map(photo => (
                        <Card key={photo.id}>
                            <Image
                                src={photo.url}
                            />
                            <div className='ui two buttons'>
                                <Button
                                    onClick={this.handleSetMainPhoto(photo)}
                                    inverted
                                    style={{color: '#53f'}}
                                >Changer</Button>
                                <Button
                                    onClick={this.handlePhotoDelete(photo)}
                                    inverted
                                    icon='trash'
                                    color='red'
                                />
                            </div>
                        </Card>
                    ))}
                </Card.Group>
            </Segment>
        );
    }
}

export default compose(
    connect(mapState, actions),
    firestoreConnect(auth => query(auth))
)(PhotosPage);