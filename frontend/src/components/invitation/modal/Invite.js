import React,{useState,useEffect, memo} from 'react';
import Buttons from './buttons/Buttons';

const Invite = ({otherUser, onHide, group}) => {
    const [stateInvitation, setStateInvitation] = useState(false);
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${otherUser['id']}/`);
    console.log(chatSocket);

    const closeOnHide = () => {
        if(!stateInvitation)chatSocket.close(1000, 'no invite');
        onHide();
    }

    let readyWebSocket = () =>{
        chatSocket.onopen = () => {
          console.log('WebSocket conectado');
        };
        
        chatSocket.onclose = function (evt) {
          console.log('WebSocket desconectado');
        };
      }

      useEffect(() => {
        readyWebSocket();
      }, [])


      chatSocket.onmessage = (message)=>{
        const dataFromserver = JSON.parse(message.data);
        if (dataFromserver){
            if(otherUser.username === dataFromserver.name){
                chatSocket.close(1000, 'thanks for response');
                alert("reponse: " + dataFromserver.response
                + "\nname: " + dataFromserver.name);
              }
        }
    }

      return (
          <div>
              <Buttons variant="danger" closeOnHide={closeOnHide} group={group}
              chatSocket={chatSocket} setStateInvitation={setStateInvitation}/>
          </div>
          )
}

export default Invite;