import React, {useContext,useState, useEffect, memo} from 'react';
import AuthContext from '../contexts/AuthContext';
import Chat from './Chat';

const ReInvitations = () => {
    let {user} = useContext(AuthContext);
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user.user_id}/`);
    let nombre = user.username;
    
    console.log(chatSocket);

    let readyWebSocket = () =>{
      chatSocket.onopen = () => {
        console.log('WebSocket conectado');
      };

      chatSocket.onclose = function (evt) {
        console.log(evt.reason);
        console.log('WebSocket desconectado');
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
      <Chat nombre={nombre} chatSocket={chatSocket}/>      
    </>
    )
}

export default memo(ReInvitations);