import React,{useState,useEffect, useContext} from 'react';
import AuthContext from '../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';

const Invite = ({otherUser, onHide}) => {
    const [stateInvitation, setStateInvitation] = useState(false);
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${otherUser['id']}/`);
    let {user} = useContext(AuthContext);
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

      function enviar(e){
        chatSocket.send(JSON.stringify({
          type:'message',
          message:`Invitacion de ${user.username}`,
          name:user.username
        }))
        setStateInvitation(true);

        setInterval(() => {
            chatSocket.close(1000, 'no responsing');
        }, 10000)
        
        e.preventDefault();

      }

      chatSocket.onmessage = (message)=>{
        const dataFromserver = JSON.parse(message.data)
        if (dataFromserver){
            if(user.username === dataFromserver.username){
                chatSocket.close(1000, 'thanks for response')}
        }
    }

      return (
          <div>
              <Button variant="danger" onClick={(e) => enviar(e)}>invitar</Button>
              <Button onClick={closeOnHide}>Close</Button>
          </div>
          )
}

export default Invite;