import React, {useState} from 'react';
import GetSala from './GetSala';

const Room = () =>{
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [entrada, setEntrada] = useState(false);
    const [messages, setMessages] = useState([]);

    const getData =async (e) => { 
        e.preventDefault();
        console.log(e.target.roomname.value);
        setRoomName(e.target.roomname.value);
        setUserName(e.target.username.value);
        let response = await fetch(`http://127.0.0.1:8000/capstone_api/messages/${e.target.roomname.value}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              }
        })
    
        let data = await response.json();
    
        if(response.status === 200){
            setMessages(data);
            console.log(messages);
        }
        else{
            alert('hiciste algo mal')
        }
        
        setEntrada(true);
        
    }


return (
    
    <>
    {!entrada ?
        (<form className="columns is-multiline" onSubmit={(e) => getData(e)} >
             <div className="column is-6 is-offset-3 mb-6">
                    <section className="hero is-primary">
                        <div className="hero-body">
                            <p className="title">
                                Chatty
                            </p>
                            <p className="subtitle">
                                A simple chat built with Django, Channels and Redis
                             </p>
                        </div>
                    </section>
                </div>
                <div className="column is-4 is-offset-4">
                    <div className="field">
                        <label>Room name</label>

            <div className="control">
                    <input className="input" type="text" placeholder="Room name" id="room-name-input" 
                    name="roomname"/>
                </div>
            </div>

                    <div className="field">
                        <label>Username</label>

                        <div className="control">
                            <input className="input" type="text" placeholder="Username" 
                            id="username-input" name="username"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-info" id="room-name-submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>):(
                <>
            <GetSala roomName={roomName} userName={userName} messages={messages} />
            </>
            )
    }
    </>
    )
}

export default Room;