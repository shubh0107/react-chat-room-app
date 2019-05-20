import React, { Component } from 'react';
import './SendMessageForm.css';


import { Form } from 'semantic-ui-react';



class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('message: ', this.state.message);
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        // console.log('current message: ', this.state.message)
        return (
            <div className="new-message-form-container col-8 p-4">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field className="message-input-field">
                        <input
                            onChange={this.handleChange}
                            value={this.state.message}
                            type="text"
                            placeholder='Type your message and hit ENTER...' />
                    </Form.Field>
                </Form>
            </div>
        )
    }

}


export default SendMessageForm;