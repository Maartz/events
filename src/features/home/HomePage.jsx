import React, {Component} from 'react'
import NavBar from "../nav/NavBar/NavBar";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import {Responsive} from 'semantic-ui-react';
import Footer from "./Footer";
import {openModal} from "../modals/ModalActions";

const actions = {
    openModal
};

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

class HomePage extends Component {
    render() {

        const handleLetsGo = () => {
            openModal('RegisterModal');
        };

        const {history, openModal, auth} = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;

        return (
            <div>
                <div style={{marginBottom: '250px'}}>
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
                                <h2>Prévoir une sortie ? Une soirée ? Un restaurant ?</h2>
                                <h2>En famille ? Avec des amis ? Des inconnus peut être ?</h2>
                                <h2>Au musée ? Au restaurant ? Au pub ?</h2>
                                <h2>Avec Events, c'est simple…</h2>
                                <h2>Vous faites ce que vous voulez</h2>
                                <br/>
                                {authenticated ?
                                    <div onClick={() => history.push('/events')} className="ui huge white inverted button">
                                        Voir les Events !!
                                        {/*<i className="right arrow icon"/>*/}
                                    </div> :
                                    <div onClick={handleLetsGo} className="ui huge white inverted button">
                                        C'est parti !!
                                        {/*<i className="right arrow icon"/>*/}
                                    </div>
                                }



                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default connect(mapState, actions)(firebaseConnect()(HomePage));