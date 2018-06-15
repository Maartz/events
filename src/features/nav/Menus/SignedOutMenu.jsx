import React from 'react'
import {Menu, Button, Icon} from "semantic-ui-react";

const SignedOutMenu = ({signIn, register}) => {
    return (
        <Menu.Item position="right">
            <Button onClick={signIn} basic inverted animated='fade'>
                <Button.Content visible>Connexion</Button.Content>
                <Button.Content hidden>
                    <Icon name='sign in alt'/>
                </Button.Content>
            </Button>
            <Button onClick={register} basic inverted content="Register" style={{marginLeft: '0.5em'}} animated='fade'>
                <Button.Content visible>Inscription</Button.Content>
                <Button.Content hidden>
                    <Icon name='user plus'/>
                </Button.Content>
            </Button>
        </Menu.Item>
    )
};

export default SignedOutMenu;