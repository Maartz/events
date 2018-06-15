import React from 'react'
import {Button, Icon} from "semantic-ui-react";

const SocialLogin = () => {
    return (
        <div>
            <Button type="button" style={{ marginBottom: '10px' }} fluid color="facebook">
                <Icon name="facebook" /> Connexion avec Facebook
            </Button>

            <Button type="button" fluid color="google plus">
                <Icon name="google plus" />
                Connexion avec Google
            </Button>
        </div>
    )
}

export default SocialLogin