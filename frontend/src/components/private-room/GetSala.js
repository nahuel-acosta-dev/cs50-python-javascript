import React, {memo} from 'react';


const GetSala = ({roomName, username, messages}) =>{
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/private_room/${roomName}/`);
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
            'username': username,
            'room': roomName
        }));

    };

    
    return(
    <div className="columns is-multiline">
        <div className="column is-6 is-offset-3 mb-6">
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">
                        Chatty {username}
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
                    <strong>{message.username}</strong>: {message.content}
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

        <small className="has-text-grey-light">Your username: {username}</small>
    </form>
</div>
    )
}

export default memo(GetSala);