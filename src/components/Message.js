import React from 'react';
import './Message.css';
import { Comment } from 'semantic-ui-react';
import Moment from 'react-moment';


function Message({ message, userId }) {
    // console.log('checking userId: ', userId === message.senderId);
    return (
        <div className="message-container">
            <Comment className={userId === message.senderId ? "content-width ml-auto" : "content-width"}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{message.senderId}</Comment.Author>
                    <Comment.Metadata>
                        {/* <div>{message.createdAt}</div> */}
                        <Moment fromNow>{message.createdAt}</Moment>
                    </Comment.Metadata>
                    <Comment.Text>{message.text}</Comment.Text>
                </Comment.Content>
            </Comment>
        </div>
    )
}


export default Message;