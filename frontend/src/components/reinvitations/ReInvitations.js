import React, {useContext, useEffect} from 'react';
import AuthContext from '../../contexts/AuthContext';
import Chat from './Chat';

const ReInvitations = ({invitations}) => {
    let {user} = useContext(AuthContext);
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user.user_id}/`);
    
    console.log(chatSocket);
    console.log(invitations);

    let readyWebSocket = () =>{
        chatSocket.onopen = () => {
          console.log('Connected WebSocket');
        };

        chatSocket.onclose = function (evt) {
          console.log(evt.reason);
          console.log('WebSocket disconnected');
        };

        chatSocket.onerror = function(e){
          console.log("ERROR OCCURED");
      }

    }

    useEffect(() =>{
        readyWebSocket();

        return () => {
            chatSocket.close(1000, 'out');
        }/*este ultimo return no es necesario ponerlo, en realidad podrias usarlo
        para que cuando lleguen las notificaciones nos avise con una notificacion roja
        en el header en la parte de receive notification, 
        esto es posible ya que nunca se apaga ese socket*/
    }, []);



    return (
    <>
    {invitations === 'void' &&
    <h1>No hay invitaciones</h1>
    }
      <Chat nombre={user.username} myId={user.user_id} chatSocket={chatSocket} 
      invitations={invitations}/>      
    </>
    )
}

export default ReInvitations;