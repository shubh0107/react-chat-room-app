import React, { Component } from 'react';
import './RoomList.css';


import { List, Header, Dimmer, Loader } from 'semantic-ui-react';



class RoomList extends Component {


    render() {
        // console.log('rooms in roomslist: ', this.props.rooms);
        const { rooms, roomId, userId, gettingRooms } = this.props;
        const orderedRooms = [...rooms].sort((a, b) => a.id - b.id)
        if (gettingRooms) {
            return (
                <div className="room-list-container col-4">
                    <Dimmer active>
                        <Loader size='medium'>Getting Rooms...</Loader>
                    </Dimmer>
                </div>
            )
        } else {
            return (
                <div className="room-list-container container col-4">
                    <div className="">
                        Logged in as<Header> {userId}</Header>
                    </div>
                    <Header as="h1" className="pl-2">Rooms:</Header>
                    {/* <List divided animated verticalAlign='middle' size="massive" className="pl-4">
                        {orderedRooms.map(room => {
                            const active = roomId === room.id;
                            console.log('ACTIVE: ', active);
                            // console.log('roomID: ', roomId);
                            return (
                                <List.Item as="a" key={room.id} className={"pointer " + active ? "room-active" : ""} onClick={() => this.props.subscribeToRoom(room.id)}>
                                    <List.Content>
                                        <List.Header>{room.name}</List.Header>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List> */}
                    <List link animated className="pl-4">
                        {orderedRooms.map(room => {
                            const active = roomId === room.id;
                            return (
                                <List.Item
                                    as="h3"
                                    key={room.id}
                                    className="pointer"
                                    active={active}
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                >
                                    # {room.name}
                                </List.Item>
                            )
                        })}
                    </List>




                </div>

            )

        }
    }

}


export default RoomList;