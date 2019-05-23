import React, { Component } from 'react';
import {
    Modal,
    Form,
    Grid,
    Label,
    Transition,
    Loader,
    Button,
    Icon
} from 'semantic-ui-react';


import './Username.css';


class Username extends Component {



    constructor() {
        super();
        this.state = {
            newUserName: '',
            newUserId: '',
            existingUserName: '',
            inputFormError: "false",
            submitted: false
        }

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }


    handleChange1 = (e) => {
        // console.log('event: ', e.target.name)
        e.preventDefault();
        this.setState({
            existingUserName: e.target.value,
            newUserName: '',
            newUserId: ''
        })
    }

    handleChange2 = (e) => {
        e.preventDefault();
        this.setState({
            existingUserName: '',
            [e.target.name]: e.target.value
        })
    }


    handleSubmit1 = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        if (this.state.existingUserName !== '' && this.state.existingUserName.length > 4) {
            this.props.existingUser(this.state.existingUserName)
        }
    }

    handleSubmit2 = (e) => {
        console.log('submitting')
        e.preventDefault();
        this.setState({
            submitted: true
        })
        if (this.state.newUserName !== ''
            && this.state.newUserId !== ''
            && this.state.newUserId.length > 4) {
            this.props.newUser(this.state.newUserName, this.state.newUserId)
        }
    }



    loginForm = () => {
        return (
            <Grid>
                <Grid.Row columns={2}>


                    <Grid.Column>

                        <Form onSubmit={this.handleSubmit1}>
                            <Form.Field>
                                {/* <label className="input-label">First Name</label> */}
                                {/* <input placeholder='Existing userId' /> */}
                                <input
                                    type="text"
                                    name="existingUserName"
                                    value={this.state.existingUserName}
                                    placeholder="Enter existing userId"
                                    onChange={this.handleChange1}
                                    transparent="true"
                                />
                                <Label pointing basic color="green" size="large">Existing user</Label>
                            </Form.Field>
                            {/* <Button type='submit'>Submit</Button> */}
                        </Form>

                    </Grid.Column>

                    <Grid.Column>

                        <Form onSubmit={this.handleSubmit2}>

                            <Form.Field>
                                {/* <label>First Name</label> */}
                                {/* <input placeholder='Enter new userId' /> */}
                                <Label pointing="below" basic color="red" size="large">New user name</Label>
                                <input
                                    type="text"
                                    name="newUserName"
                                    id="newUserName"
                                    value={this.state.newUserName}
                                    placeholder="Enter your name"
                                    // error={this.state.inputFormError}
                                    onChange={this.handleChange2}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Label basic pointing="below" color="red" size="large">New userId</Label>
                                <input
                                    type="text"
                                    name="newUserId"
                                    id="newUserId"
                                    value={this.state.newUserId}
                                    placeholder="Enter your desired userId"
                                    // error={this.state.inputFormError}
                                    onChange={this.handleChange2}
                                />
                            </Form.Field>
                            <Button color='green' inverted disabled={!this.state.newUserId || !this.state.newUserName}>
                                <Icon name='checkmark' /> Sign me up
                            </Button>
                        </Form>

                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }



    loader = () => {
        return (
            <Loader inline="centered" />
        )
    }


    render() {
        // console.log('current state: ', this.state)
        const { open, saveUsername } = this.props;
        return (
            // <Modal
            //     basic
            //     centered={true}
            //     size=""
            //     dimmer="blurring"
            //     closeOnDimmerClick={false}
            //     closeOnEscape={false}
            //     open={open}
            //     onClose={this.close}>
            //     {/* <Modal.Header>Enter user name</Modal.Header> */}
            //     <Header content="testing" />
            //     <Modal.Content>

            //         <Grid>
            //             <Grid.Row columns={2} divided className="ml-0">
            //                 <Grid.Column>
            //                     <Form onSubmit={this.handleSubmit}>
            //                         <Form.Field>
            //                             <input
            //                                 type="text"
            //                                 value={this.state.userName}
            //                                 placeholder="Enter your name"
            //                                 onChange={this.handleChange}
            //                             />
            //                         </Form.Field>
            //                     </Form>
            //                 </Grid.Column>
            //                 <Grid.Column>
            //                     <Form onSubmit={this.handleSubmit}>
            //                         <Form.Field>
            //                             <input
            //                                 type="text"
            //                                 value={this.state.userName}
            //                                 placeholder="Enter your name"
            //                                 onChange={this.handleChange}
            //                             />
            //                         </Form.Field>
            //                     </Form>
            //                 </Grid.Column>
            //             </Grid.Row>
            //         </Grid>

            //     </Modal.Content>
            //     <Modal.Actions>
            //         {/* <Button color='black' onClick={this.close}>
            //                 Nope
            //             </Button> */}
            //         <Button
            //             positive
            //             icon='checkmark'
            //             labelPosition='right'
            //             content="Yep, that's me"
            //             disabled={this.state.userName === '' || this.state.userName.length < 4}
            //             onClick={() => saveUsername(this.state.userName)}
            //         />
            //     </Modal.Actions>
            // </Modal>



            <div>
                <Transition.Group animation='scale' duration={500}>
                    {open && (
                        <Modal
                            basic
                            size='small'
                            open={true}>
                            {/* <Header content='Archive Old Messages' /> */}
                            <Modal.Content>
                                {this.loginForm()}
                            </Modal.Content>
                            <Modal.Actions>
                                {this.state.submitted ? this.loader() : ''}
                            </Modal.Actions>
                        </Modal>
                    )}
                </Transition.Group>
                {/* <Dimmer active={this.state.submitted}> */}
                {/* <Loader active={this.state.submitted}/> */}
                {/* </Dimmer> */}




            </div>







        )
    }


}

export default Username;
