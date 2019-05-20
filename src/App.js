import React from 'react';
import './App.css';

import Chatkit from '@pusher/chatkit-client';

import MessageList from './components/MessageList';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';


import { tokenUrl, instanceLocator } from './config';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      userId: 'shubh01',
      roomId: null,
      messages: [],
      gettingMessages: false,
      joinableRooms: [],
      joinedRooms: [],
      gettingRooms: true
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: this.state.userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })


    chatManager.connect()
      .then(currentUser => {
        console.log('connected as user: ', currentUser)
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => {
        console.log('error while getting current user. ', err);
      })
  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  subscribeToRoom = (roomId) => {
    console.log('roomID: ', roomId);
    this.setState({
      messages: [],
      gettingMessages: true
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
            gettingMessages: false
          })
          // console.log(message.text);
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id,
          gettingMessages: false
        });
        this.getRooms();
      })
      .catch(err => {
        console.log('error while subscribing to room.', err);
      })
  }

  getRooms = () => {
    // this.setState({
    //   gettingRooms: true
    // })
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms,
          gettingRooms: false
        })
      })
      .catch(err => {
        console.log('Error while getting rooms. ', err);
      })
  }


  createRoom = (name) => {
    // console.log('roomName is ', roomName);
    this.currentUser.createRoom({
      name
    })
      .then(newRoom => {
        this.subscribeToRoom(newRoom.id)
      })
      .catch(err => {
        console.log('Error while creating new rooom');
      })
  }

  render() {
    // console.log('messages in state: ', this.state.messages);
    return (
      <div className="App" >
        <div className="row">
          <RoomList
            roomId={this.state.roomId}
            subscribeToRoom={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            gettingRooms={this.state.gettingRooms} />
          <MessageList
            userId={this.state.userId}
            messages={this.state.messages}
            gettingMessages={this.state.gettingMessages} />
        </div>
        <div className="row">
          <NewRoomForm createRoom={this.createRoom} />
          <SendMessageForm sendMessage={this.sendMessage} />
        </div>
      </div>
    )
  };
}

export default App;
