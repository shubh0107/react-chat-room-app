import React from 'react';
import './App.css';

import Chatkit from '@pusher/chatkit-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MessageList from './components/MessageList';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';
import Username from './components/Username';
import Toaster from './components/Toaster';


import { tokenUrl, instanceLocator, secretKey } from './config';


import { Transition } from 'semantic-ui-react';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userId: null,
      roomId: null,
      messages: [],
      gettingMessages: false,
      joinableRooms: [],
      joinedRooms: [],
      gettingRooms: true,
      showToaster: false
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.saveUsername = this.saveUsername.bind(this);

    this.existingUser = this.existingUser.bind(this)
    this.newUser = this.newUser.bind(this)

    this.showToaster = this.showToaster.bind(this)

  }

  componentDidMount() {
    console.log('in this hook')
  }


  saveUsername = userName => {
    console.log('im in saveusername: ', userName)
    this.setState({
      userId: userName
    })
    this.logInUser(userName);
  }


  existingUser = (userId) => {
    console.log('in existing user: ', userId)
    this.setState({
      userId: userId
    }, () => {
      this.logInUser()
    })
  }

  newUser = (userName, userId) => {
    console.log('new user name: ', userName)
    console.log('new user id: ', userId)

    const chatkit = new Chatkit({
      instanceLocator,
      key: secretKey
    })

    console.log('creating user')
    chatkit.createUser({
      id: userId,
      name: userName
    }, () => {
      console.log('user creation successfull!')
    })
  }


  logInUser = () => {
    console.log('user id in login user: ', this.state.userId)
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
        this.setState({
          loggedIn: true
        })
        this.showToaster('success', `Logged in as ${currentUser.id}`)
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => {
        console.log('error while getting current user. ', err);
        this.showToaster('error', err.info.error_description)
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

  showToaster = (type, text) => {
    switch (type) {
      case 'success':
        toast(text, {
          autoClose: 3000,
          hideProgressBar: true
        });
        break;
      case 'error':
        toast.success(text, {
          autoClose: 3000,
          hideProgressBar: true
        })
        break;
      default:
        return null;
    }
    // toast.configure({
    // autoClose: 3000,
    // draggable: false,
    //etc you get the idea
    // });
  }

  render() {
    // console.log('messages in state: ', this.state.messages);
    const showUsernameModal = this.state.loggedIn ? false : true;
    // console.log('showUsername modal: ', showUsernameModal);
    // if (showUsernameModal) {
    // return (
    //   <Username open={showUsernameModal} saveUsername={this.saveUsername} />
    // )
    // return (
    //   <div>
    //     <Modal centered={true} open={true} basic size='small'>
    //       <Header icon='archive' content='Archive Old Messages' />
    //       <Modal.Content>
    //         <p>
    //           Your inbox is getting full, would you like us to enable automatic archiving of old messages?
    //         </p>
    //       </Modal.Content>
    //       <Modal.Actions>
    //         <Button basic color='red' inverted>
    //           <Icon name='remove' /> No
    //         </Button>
    //         <Button color='green' inverted>
    //           <Icon name='checkmark' /> Yes
    //         </Button>
    //       </Modal.Actions>
    //     </Modal>
    //   </div>
    // )
    // }

    return (
      <div className="App" >

        {/* <Transition visible={showUsernameModal} animation='scale' duration={500}> */}
        <Username
          open={showUsernameModal}
          saveUsername={this.saveUsername}
          existingUser={this.existingUser}
          newUser={this.newUser} />
        {/* </Transition> */}

        <div className="row">
          <RoomList
            roomId={this.state.roomId}
            userId={this.state.userId}
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

        <ToastContainer />

      </div >
    )
  };
}

export default App;
