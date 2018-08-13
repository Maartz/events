import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import ResetPasswordForm from '../auth/login/ResetPasswordForm';
import {closeModal} from "./ModalActions";

const actions = {closeModal};

class ResetPasswordModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}
            >
                <Modal.Header>
                    Réinitialiser le mot de passe
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <ResetPasswordForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(ResetPasswordModal);