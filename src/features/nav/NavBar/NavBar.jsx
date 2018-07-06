import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withFirebase} from 'react-redux-firebase'
import {Menu, Container, Button} from 'semantic-ui-react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignInMenu from "../Menus/SignInMenu";
import {openModal} from "../../modals/ModalActions";

const actions = {
    openModal,
};

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

class NavBar extends Component {

    handleSignIn = () => {
        this.props.openModal('LoginModal');
    };

    handleRegister = () => {
        this.props.openModal('RegisterModal');
    };

    handleSignOut = () => {
        this.props.firebase.logout();
        this.props.history.push('/');
    };

    render() {
        const {auth, profile} = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
            <Menu borderless inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to='/' header>
                        <img src="/assets/logo.png" alt="logo"/>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/events' name="Events"/>
                    {authenticated && <Menu.Item as={NavLink} to='/people' name="Eventeurs"/>}

                    {authenticated && <Menu.Item>
                        <Button as={Link}
                                to='/createEvent'
                                floated="right"
                                style={{background: '#53f' , color : '#fff', border: '2px solid white'}}
                                content="Créer un Events"/>
                    </Menu.Item>}
                    {
                        authenticated ? (
                            <SignInMenu
                                auth={auth}
                                profile={profile}
                                signOut={this.handleSignOut}
                            />) : (
                            <SignedOutMenu
                                signIn={this.handleSignIn}
                                register={this.handleRegister}
                            />)}
                </Container>
            </Menu>
        )
    }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));