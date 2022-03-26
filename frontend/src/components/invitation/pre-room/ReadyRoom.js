import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Navigate} from "react-router-dom";

const ReadyRoom = ({groupDetails}) => {
    const [redirectRoom, setRedirectRoom] = useState(false);
    let roomName = groupDetails.name.replace(/ /g, '_');
    const Socket = new WebSocket(`ws://localhost:8000/ws/private/pre_room/${roomName}_${groupDetails.user}`);

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

    useEffect(() =>{
        readyWebSocket();
        return () => Socket.close(1000, 'Filling the room');
    }, [])


    return(
        <>
            <h1>Cargando usuarios...</h1>
            <Button variant="danger" onClick={(e) => enviar(e)}>Empezar</Button>

            {redirectRoom &&
                <Navigate to="/room" />
            }
        </>
    )
}

export default ReadyRoom;