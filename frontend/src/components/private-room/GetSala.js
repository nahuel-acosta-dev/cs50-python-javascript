import React, {memo} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const GetSala = ({roomName, username, messages, setMessages}) =>{
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/private_room/${roomName}/`);
    console.log(messages);
    console.log(messages)
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
    <section className="columns is-multiline cont-room">
        <Row className="room-msj justify-content-center align-content-center">
            <div className="inf column is-6 is-offset-3 mb-6">
                <div className="hero is-primary">
                    <div className="hero-body">
                        <h4 className="title text-center">
                            Room
                        </h4>
                        <h5 className="has-text-grey-light">Ready {username}</h5>
                    </div>
                </div>
            </div>

            <form className="column is-6 is-offset-3" onSubmit={(e) => messageSubmit(e)}>
                <div className="box">
                    <div id="chat-messages">
                    {messages.map((message, i) => (
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
                    <Col xs={10} className="field">
                        <div className="control row align-content-center justify-content-center">
                            <input className="input" type="text" placeholder="Message" name="chatmessage" />
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
</section>
    )
}

export default memo(GetSala);