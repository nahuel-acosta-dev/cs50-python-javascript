import React, {useEffect, useState} from 'react';
import MyUser from './showusers/MyUser';
import OtherUser from './showusers/OtherUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Navigate} from "react-router-dom";

const LoadUsers = ({group, getGroupDetails}) => {
    const [redirectRoom, setRedirectRoom] = useState();
    let roomName = group.name.replace(/ /g, '_');
    const standbySocket = new WebSocket(`ws://localhost:8000/ws/private/pre_room/${roomName}_${group.user}`);


    let readyWebSocket = () =>{
        standbySocket.onopen = () => {
          console.log('Connected WebSocket');
        };

        standbySocket.onclose = function (evt) {
          console.log(evt.reason);
          console.log('WebSocket disconnected');
        };

        standbySocket.onerror = function(e){
          console.log("ERROR OCCURED");
      }

    }

    standbySocket.onmessage = (message)=> {
        const dataFromserver = JSON.parse(message.data);
        if (dataFromserver){
            if(dataFromserver.message == 'ready'){
                setRedirectRoom('ready');
            }
            else if(dataFromserver.message == 'newUser')getGroupDetails();
        }
      }

      const enviar = (e) => {
        standbySocket.send(JSON.stringify({
          type:'message',
          message:'newUser',
          username: '',
          room: `${roomName}_${group.user}`
        }))

        e.preventDefault();
      }

    useEffect(() => {
        readyWebSocket();
        return () => {
            standbySocket.close(1000, 'Leaving the waiting room');
        }
    }, [])

    return(
        <>
        <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <section className="row">
                <div className="col-6">
                    <MyUser group={group} getGroupDetails={getGroupDetails}/>
                    <OtherUser group={group} />
                </div>
                <div className="col-6">{group.user_username}</div>
            </section>
         </Modal.Body>
            <Button variant="danger" onClick={(e) => enviar(e)}/>
         {redirectRoom == 'ready' &&
            <Navigate to="/room"/>
         }
         
         </>
    )
}

export default LoadUsers;