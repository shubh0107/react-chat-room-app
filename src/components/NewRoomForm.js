import React, { Component } from 'react';
import './NewRoomForm.css';


import { Form, Icon } from 'semantic-ui-react';



class NewRoomForm extends Component {


    constructor() {
        super();
        this.state = {
            newRoomName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        e.preventDefault();
        this.setState({
            newRoomName: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.newRoomName);
        this.setState({
            newRoomName: ''
        })
    }

    render() {
        return (
            <div className="new-room-form col-4 p-4">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group inline>
                        <Form.Field width="14">
                            <input
                                className="new-room-name-field"
                                type="text"
                                placeholder="Enter room name"
                                value={this.state.newRoomName}
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Button width="2">
                            <Icon className="m-0" name="add" />
                        </Form.Button>
                    </Form.Group>
                </Form>
            </div >
        )
    }

}


export default NewRoomForm;