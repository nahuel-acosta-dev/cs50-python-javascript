import React,{useState,useEffect} from 'react';
import Buttons from './buttons/Buttons';

const Invite = ({otherUser, onHide, group, getGroup}) => {
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
                console.log(dataFromserver);
                console.log(dataFromserver.response);
                if(dataFromserver.response == true){
                  console.log('entre');
                  getGroup();
                  console.log('response: ' + dataFromserver.response);
                }
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