import React, {Component} from 'react'
import {Emoji} from "emoji-mart";
import NavBar from "../nav/NavBar/NavBar";
import { firebaseConnect } from 'react-redux-firebase'
import {Grid, Container, Header, Responsive} from 'semantic-ui-react';


class HomePage extends Component {

    render() {
        const {history, firebase} = this.props;
        // const storage = firebase.storage();
        // const video = storage.ref('events.mp4').toString();
        // console.log(storage.ref('events.mp4').toString());
        return (
            <div>
                <div style={{marginBottom: '285px'}}>
                    <NavBar/>
                    <div>
                        <Responsive
                            className='video-container'>
                            <video
                                preload='auto'
                                style={{
                                    filter: 'brightness(0.6) opacity(80%)'
                                }}
                                src="https://firebasestorage.googleapis.com/v0/b/revents-206917.appspot.com/o/events.mp4?alt=media&token=8f6ce90b-8470-4220-8007-ae658a5c7ccf"
                                muted={true}
                                loop={true}
                                autoPlay={true}
                            />
                        </Responsive>
                        <div className="ui inverted vertical masthead center aligned segment">
                            <div className="ui text container">
                                <h1 className="ui inverted stackable header">
                                    <img
                                        className="ui image massive"
                                        src="/assets/logo.png"
                                        alt="logo"
                                    />
                                    <div className="content">Events</div>
                                    <br/>
                                </h1>
                                <br/>
                                <h3>Prévoir une sortie ? Une soirée ? Un restaurant ?</h3>
                                <h3>En famille ? Avec des amis ? Des inconnus peut être ?</h3>
                                <h3>Au musée ? Au restaurant ? Au pub ?</h3>
                                <h3>Avec Events, c'est simple…</h3>
                                <h2>Vous faites ce que vous voulez.</h2>
                                <br/>
                                <div onClick={() => history.push('/events')} className="ui huge white inverted button">
                                    C'est parti !!
                                    {/*<i className="right arrow icon"/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Container>
                    <Header as='h2' textAlign='center' size='huge'>
                        Avec Events c'est <span style={{marginLeft: '0.2em'}}> <Emoji size={35} emoji='star-struck'/><Emoji size={35} emoji='ok_hand'/> </span>
                    </Header>
                    <Grid>
                        <Grid.Column width={8}>
                            <p>test</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <p>test</p>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default firebaseConnect()(HomePage);