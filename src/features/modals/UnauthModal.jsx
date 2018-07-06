import React, {Component} from 'react';
import {Modal, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

import {closeModal, openModal} from "./ModalActions";

const actions = {closeModal, openModal};

class UnauthModal extends Component {

    handleCloseModal = () => {
        if (this.props.location.pathname.includes('/event')) {
            this.props.closeModal();
        } else {
            this.props.history.goBack();
            this.props.closeModal();
        }
    };

    render() {
        const {openModal} = this.props;
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.handleCloseModal}
            >
                <Modal.Header>
                    Vous devez être connecté pour faire cela.
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Connectez vous ou créer un compte pour voir cette page</p>
                        <Button.Group widths={4}>
                            <Button fluid color='teal' onClick={() => openModal("LoginModal")}>Connexion</Button>
                            <Button.Or />
                            <Button fluid positive onClick={() => openModal("RegisterModal")}>Inscription</Button>
                        </Button.Group>
                        <Divider/>
                        <div style={{textAlign: 'center'}}>
                            <p>Ou cliquez ici pour continuer en tant qu'invité</p>
                            <Button onClick={this.handleCloseModal}>Annulé</Button>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default withRouter(connect(null, actions)(UnauthModal));