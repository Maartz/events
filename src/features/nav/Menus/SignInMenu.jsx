import React from 'react'
import {Menu, Dropdown, Image} from "semantic-ui-react";
import {Link} from 'react-router-dom'

const SignInMenu = ({signOut, profile, auth}) => {
    return (
        <Menu.Item position="right">
            <Image avatar spaced="right" src={profile.photoURL ||'/assets/user.png'}/>
            <Dropdown pointing="top left" text={profile.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to='/createEvent'
                        text="Créer un évènement"
                        icon="plus"
                    />
                    <Dropdown.Item as={Link} to={'/people'} text="Mes contatcs" icon="users"/>
                    <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="Mon profil" icon="user"/>
                    <Dropdown.Item as={Link} to='/settings' text="Réglages" icon="settings"/>
                    <Dropdown.Item onClick={signOut} text="Déconnexion" icon="power"/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}

export default SignInMenu;