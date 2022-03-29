import React, {useEffect, useState} from 'react';
import MyUser from './showusers/MyUser';
import OtherUser from './showusers/OtherUser';
import Modal from 'react-bootstrap/Modal';

const LoadUsers = ({group, getGroupDetails, setRedirectRoom, myUser, myUsername}) => {
    const [enterPreRoom, setEnterPreRoom] = useState(false);
    const [otherUser, setOtherUser] = useState(false);
    let roomName = group.name.replace(/ /g, '_');
    const standbySocket = new WebSocket(`ws://localhost:8000/ws/private/pre_room/${roomName}_${group.user}`);


    const enviar = () => {
        standbySocket.send(JSON.stringify({
          type:'message',
          message:'newUser',
          username: myUsername,
          room: `${roomName}_${group.user}`
        }))
      }

      if(enterPreRoom)setTimeout(() => {enviar()}, 5000);

    let readyWebSocket = () =>{
        standbySocket.onopen = () => {
          console.log('Connected WebSocket');
          setEnterPreRoom(true);
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
            /*else if(dataFromserver.message == 'newUser'){
              if(group.user1 == null || group.user2 == null)getGroupDetails();}*/
            else if(dataFromserver.message == 'newUser'){
            if(dataFromserver.username !== myUsername)setOtherUser(dataFromserver.username);}
        }
      }

    useEffect(() => {
        readyWebSocket();
        return () => {standbySocket.close(1000, 'Leaving the waiting room');}
    }, [])

    return(
        <>
        <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <section className="row">
                <div className="col-6">
                    <MyUser group={group} myUser={myUser}/>
                    <OtherUser group={group} myUser={myUser} otherUser={otherUser}/>
                </div>
                <div className="col-6">{group.user_username}</div>
            </section>
         </Modal.Body>
         
         </>
    )
}

export default LoadUsers;