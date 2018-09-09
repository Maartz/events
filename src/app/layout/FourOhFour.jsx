import React from 'react'
import {Emoji} from "emoji-mart";
import {Header} from 'semantic-ui-react';

const FourOhFour = () => {
    return (
        <div>
            <div>
                <Header as="h1" style={{fontSize: 100}}>
                    Oups ! <Emoji emoji='sweat_smile' size={50} native/><Emoji emoji='point_right' size={50} native/><Emoji emoji='point_left' size={50} native/></Header>
                <h2>Il semble que quelque chose se soit mal passé…</h2>
                <p>Ha oui, vraiment mal passé…</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p>Je pense qu'il va falloir virer le stagiaire.</p>
            </div>
        </div>
    )
};

export default FourOhFour