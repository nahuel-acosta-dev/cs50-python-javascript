import React, {useState, memo, useEffect} from 'react';
import ModalSmall from './ModalSmall';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Navigate} from "react-router-dom";

const GetSala = ({roomName, username, messages, setMessages, desactiveGroup, group, creatorUsername}) =>{
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/private_room/${roomName}/`);
    const [redirect, setRedirect] = useState(false);
    const [smShow, setSmShow] = useState(false); 

    console.log(messages);
    if(group){
        console.log(group.id);
    }

    chatSocket.onmessage = function(e) {
        console.log('onmessage');

        const data = JSON.parse(e.data);

        if (data.message) {
            setMessages([...messages,
                {
                    username: data.username,
                    content: data.message
                }
            ])
        } else {
            alert('The message is empty!');
        };


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
    if(group){
        console.log(group.active)
    }
    //After the indicated time has elapsed, the modal is activated
    if(group || username != creatorUsername){
    setTimeout(() =>{
        setSmShow(true);     
    }, 55000)

    //After the indicated time has elapsed, the group is deactivated.
    setTimeout(() =>{
        if(username == creatorUsername){
        desactiveGroup();}
        if(group && username == creatorUsername){
        console.log(group.active);
        }

        else if(username != creatorUsername){
            setRedirect(true);
        }
    }, 60000)
}

    if(username == creatorUsername){
        if(group.active == "false")setRedirect(false);
    }

    return(
    <section className="columns is-multiline cont-room">
        <Row className="room-msj justify-content-center align-content-center">
            <div className="inf column is-6 is-offset-3 mb-6">
                <div className="hero is-primary">
                    <div className="hero-body">
                        <h4 className="title text-center">
                            Room
                        </h4>
                        <h5 className="has-text-grey-light">The room only lasts 10 minutes, starts {username}</h5>
                    </div>
                </div>
            </div>

            <form className="column is-6 is-offset-3" onSubmit={(e) => messageSubmit(e)}>
                <div className="box">
                    <div id="chat-messages">
                    {messages.reverse().map((message, i) => (
                        message.username == username ?
                        <div key={i} className="cont-msj">
                            <div className="my-msj">
                                <div className="row subCajitaAzul">
                                    <div className="row">{message.content}</div>
                                </div>
                            </div>
                            <div className="avatarAzul">
                                {message.username.toUpperCase()[0]}
                            </div>
                        </div>

                        :

                        <div key={i} className="other-cont-msj">
                            <div className="avatarAzul other-avatar">
                                {message.username.toUpperCase()[0]}
                            </div>
                            <div className="my-msj other-msj">
                                <div className="row subCajitaAzul">
                                    <div className="row">{message.content}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <Row className="cont-send-msj justify-content-center">
                    <Col xs={8} className="field">
                        <div className="control row align-content-center justify-content-center">
                            <input className="input" type="text" placeholder="Idea" name="chatmessage" />
                        </div>
                    </Col>

                    <Col xs={2} className="field cont-btn">
                        <div className="control">
                            <Button type="submit" variant="primary" className="button is-info" 
                            name="chat-message-submit">Send</Button>{' '}
                        </div>
                    </Col>
                </Row>
            </form>
    </Row>
    <ModalSmall smShow={smShow} setSmShow={setSmShow}/>
    {
    redirect &&
        <Navigate to="/"/>
    }
</section>
    )
}

export default memo(GetSala);


