import React, {useEffect, useState, memo} from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../../loading/Loading';
import {Navigate} from "react-router-dom";

const ReadyRoom = ({groupDetails}) => {
    const [redirectRoom, setRedirectRoom] = useState(false);
    const [userOut, setUserOut] = useState(false);
    let roomName = groupDetails.name.replace(/ /g, '_');
    let encryptedPath;

    //connects to websocket
    const Socket = new WebSocket(`ws://localhost:8000/ws/private/pre_room/${roomName}_${groupDetails.user}`);
    
    /*if you have the creator user of the group and the name of the room, they are saved in this
    variable to be encrypted later*/
    if(groupDetails.user && roomName)encryptedPath = `${roomName}_${groupDetails.user}`;

    let readyWebSocket = () =>{
        Socket.onopen = () => {
          console.log('Connected WebSocket');
        };

        Socket.onclose = function (evt) {
          console.log(evt.reason);
          console.log('WebSocket disconnected');
        };

        Socket.onerror = function(e){
          console.log("ERROR OCCURED");
      }

    }

    const enviar = (e) => {
        Socket.send(JSON.stringify({
          type:'message',
          message:'ready',
          username: groupDetails.user,
          room: `${roomName}_${groupDetails.user}`
        }))

        setRedirectRoom(true);
        e.preventDefault();
      }
      
      Socket.onmessage = (message)=> {
        const dataFromserver = JSON.parse(message.data);
        if (dataFromserver){
            if(dataFromserver.message == 'out' && dataFromserver.username != group.user_username){
              setUserOut(dataFromserver.username)}
        }
      }

    useEffect(() =>{
        readyWebSocket();
        return () => Socket.close(1000, 'Filling the room');
    }, [])


    return(
        <>{groupDetails.user1 == null && groupDetails.user2 == null &&
            (<h1>Cargando usuarios...</h1>)
          }

          {!userOut ?
          (groupDetails.user1 == null ?
          (<Loading />) :
          <p>{groupDetails.user1_username}</p>)
          :
          (userOut == groupDetails.user1_username ?
          (<p>El user 1 se ha salido</p>)
          :
          <p>{groupDetails.user1_username}</p>)
          }

          {!userOut ?
          (groupDetails.user2 == null ?
          (<Loading />) :
          <p>{groupDetails.user2_username}</p>)
          :
          (userOut == groupDetails.user2_username ?
          (<p>El user 2 se ha salido</p>)
          :
          <p>{groupDetails.user2_username}</p>)
          }

          <Button variant="danger" onClick={(e) => enviar(e)}>Empezar</Button>

            {redirectRoom &&
                <Navigate to={`/private_room/${btoa(encryptedPath)}/${btoa(groupDetails.user_username)}/${btoa(groupDetails.user)}`} />
            }
        </>
    )
}

export default ReadyRoom;