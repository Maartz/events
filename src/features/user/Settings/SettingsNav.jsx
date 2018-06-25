import React from 'react'
import {Grid, Header, Menu} from "semantic-ui-react";
import {NavLink} from 'react-router-dom';

const SettingsNav = () => {
    return (
        <Grid.Column width={4}>
            <Menu vertical>
                <Header
                    icon="user"
                    attached
                    style={{backgroundColor: '#4e3ef5', color: 'white'}}
                    content="Profil"
                />
                <Menu.Item as={NavLink} to='/settings/basic'>Mes informations</Menu.Item>
                <Menu.Item as={NavLink} to='/settings/about'>À propos</Menu.Item>
                <Menu.Item as={NavLink} to='/settings/photos'>Mes photos</Menu.Item>
            </Menu>
            <Grid.Row/>
            <Menu vertical>
                <Header
                    icon="settings"
                    attached
                    style={{backgroundColor: '#05d5ff', color: 'white'}}
                    content="Compte"
                />
                <Menu.Item as={NavLink} to='/settings/account'>Mon compte</Menu.Item>
            </Menu>
        </Grid.Column>
    )
};

export default SettingsNav;