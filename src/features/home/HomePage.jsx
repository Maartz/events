import React from 'react'
import {Emoji} from "emoji-mart";

const HomePage = ({history}) => {
    return(
        <div>
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
                        {/*<Emoji emoji='date' set='emojione' size={40}/>*/}
                        {/*<Emoji emoji='call_me_hand' set='apple' size={40}/>*/}
                    </h1>
                    <h2>Faites ce que vous voulez.</h2>
                    <br/>
                    <br/>
                    <div onClick={() => history.push('/events')} className="ui huge white inverted button">
                        C'est parti !!
                        <i className="right arrow icon" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage;