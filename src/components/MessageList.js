import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import './MessageList.css';

import { Comment, Dimmer, Loader } from 'semantic-ui-react';

class MessageList extends Component {


    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }


    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
    }



    render() {
        const { userId, messages, gettingMessages } = this.props;
        if (gettingMessages) {
            return (
                <div className="message-list-container col-8">
                    <Dimmer active>
                        <Loader size='medium'>Getting messages...</Loader>
                    </Dimmer>
                </div>
            )
        }
        return (
            <div className="message-list-container col-8">
                <Comment.Group className="messages-list">
                    {messages.map((message, index) => {
                        return (
                            <Message userId={userId} message={message} key={index} />
                        )
                    })}

                </Comment.Group>
            </div>
        )
    }

}


export default MessageList;