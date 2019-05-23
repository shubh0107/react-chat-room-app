import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';


import './Toaster.css';


class Toaster extends Component {





    render() {
        const { visible } = this.props;
        if (true) {
            return (
                <Message
                    negative
                    visible={true}
                    attached="top"
                    className="toaster">
                    <Message.Header>We're sorry we can't apply that discount</Message.Header>
                    <p>That offer has expired</p>
                </Message>
            )
        }
        return null;
    }
}




export default Toaster;