import React, {Component} from 'react'
import {Button, Form} from "semantic-ui-react";
import {Field, reduxForm} from 'redux-form'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import TextArea from "../../../app/common/form/TextArea";

class EventDetailedChatForm extends Component {

    handleCommentSubmit = values => {
        const { addEventComment, reset, eventId, closeForm, parentId } = this.props;
        addEventComment(eventId, values, parentId);
        reset();
        if(parentId !== 0) {
            closeForm();
        }
    };

    addEmoji = () => {
        // TODO
    };

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
                <Field
                    name='comment'
                    type='text'
                    component={TextArea}
                    rows={2}
                />
                {/*<Picker*/}
                    {/*title='Dites le avec un emoji…'*/}
                    {/*emoji='point_up'*/}
                    {/*set='apple'*/}
                    {/*emojiTooltip*/}
                    {/*perLine={12}*/}
                    {/*onSelect={this.addEmoji}*/}
                {/*/>*/}
                <Button
                    content="Répondre"
                    labelPosition="left"
                    icon="edit"
                    primary
                />
            </Form>
        );
    }

}

export default reduxForm({Fields: 'comment'})(EventDetailedChatForm);