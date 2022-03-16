import React, {useState,useEffect, useContext} from 'react';
import ItemService from '../../services/ItemService';
import AuthContext from '../../contexts/AuthContext';
const GetSala = ({roomName, userName, messages}) =>{
    let {user} = useContext(AuthContext);
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/${roomName}/`);
    console.log(messages);
    
        chatSocket.onmessage = function(e) {
        console.log('onmessage');

        const data = JSON.parse(e.data);

        if (data.message) {
            document.querySelector('#chat-messages').innerHTML += ('<b>' + data.username + '</b>: ' + data.message + '<br>');
        } else {
            alert('The message is empty!');
        }

    

    chatSocket.onclose = function(e) {
        console.log('The socket close unexpectadly');
    };

    }

    const messageSubmit = (e) => {
        e.preventDefault();
        const message = e.target.chatmessage.value;

        chatSocket.send(JSON.stringify({
            'message': message,
            'username': userName,
            'room': roomName
        }));

    };

    
    return(
    <div className="columns is-multiline">
        <div className="column is-6 is-offset-3 mb-6">
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">
                        Chatty {userName}
                    </p>
                    <p className="subtitle">
                        A simple chat built with Django, Channels and Redis {roomName}
                    </p>
                </div>
            </section>
        </div>

    <form className="column is-6 is-offset-3" onSubmit={(e) => messageSubmit(e)}>
        <div className="box">
            <div id="chat-messages">
            {messages.map((message, i) => (
                <li key={i}>
                    {message.content}
                </li>
            ))}
            </div>
        </div>

        <div className="field">
            <div className="control">
                <input className="input" type="text" placeholder="Message" name="chatmessage" />
            </div>
        </div>

        <div className="field">
            <div className="control">
                <button type="submit" className="button is-info" 
                name="chat-message-submit">Submit</button>
            </div>
        </div>

        <small className="has-text-grey-light">Your username: {userName}</small>
    </form>
</div>
    )
}

export default GetSala;