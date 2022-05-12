import React, {useEffect, useState} from 'react';
import MyUser from './showusers/MyUser';
import OtherUser from './showusers/OtherUser';
import Modal from 'react-bootstrap/Modal';
import Buttons from './buttons/Buttons';
import {Navigate} from "react-router-dom";

const LoadUsers = ({group, getGroupDetails, myUser, myUsername, setShow}) => {
    const [redirectRoom, setRedirectRoom] = useState(false);
    let roomName = group.name.replace(/ /g, '_');
    let encryptedPath;
    const standbySocket = new WebSocket(`ws://localhost:8000/ws/private/pre_room/${roomName}_${group.user}`);

    if(roomName && group.user)encryptedPath = `${roomName}_${group.user}`;

    const enviar = (e, message) => {
        standbySocket.send(JSON.stringify({
          type:'message',
          message:message,
          username: myUsername,
          room: `${roomName}_${group.user}`
        }))

        //e.preventDefault();
      }


    //este es el problema de que se envie tantas veces los mensajes, y 
    //de las re renderizaciones con getGroupDetails();
    //if(enterPreRoom)setTimeout(() => {memo(enviar())}, 5000);//Esto genera demasiados mensajes
    /*esto ocurre porque al renderizar tantas veces, se envian muchos mensajes. reintentar poniendolo 
    en el return. Pero ponerlo aqui es muy malo*/
    

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
            if(dataFromserver.message == 'ready')setRedirectRoom('ready');
            else if(dataFromserver.message == 'newUser' && dataFromserver.username != myUsername){
              if(group.user1 == null || group.user2 == null)getGroupDetails();}
            else if(dataFromserver.message == 'out' && dataFromserver.username != myUsername){
              getGroupDetails();}
           /* else if(dataFromserver.message == 'newUser'){
            if(dataFromserver.username !== myUsername)setOtherUser(dataFromserver.username);}*/
        }
      }

    useEffect(() => {
        readyWebSocket();
        return () => {standbySocket.close(1000, 'Leaving the waiting room');}
    }, [])

    return(
        <>
        {redirectRoom == 'ready' &&
                <Navigate to={`/private_room/${btoa(encryptedPath)}/${btoa(myUsername)}/${btoa(myUser)}`}/>}
        <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <section className="row">
                <div className="col-6">
                    <MyUser group={group} myUser={myUser} getGroupDetails={getGroupDetails}/>
                    <OtherUser group={group} myUser={myUser}/>
                    <Buttons enviar={enviar} group={group} setShow={setShow}/>
                    {/*en views crear una function que elimine el usuario del grupo, luego aqui llamar esa
                    function de la api y luego usar el enviar*/}
                </div>
                <div className="col-6">{group.user_username}</div>
            </section>
         </Modal.Body>
         </>
    )
}

export default LoadUsers;