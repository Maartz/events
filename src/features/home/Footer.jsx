import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return(
        <div className="footer shadow">
            <footer>
                <Link to="/legalMentions"> Mentions Légales</Link>
                <Link to="/confidentialityPolitic">Politique de confidentialité</Link>
            </footer>
        </div>
    )
};

export default Footer;