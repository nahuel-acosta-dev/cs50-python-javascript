import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import Cajitaone from './Cajitaone';
import Cajitatwo from './Cajitatwo';

const ShowMsj = ({id, thread, message_username, myUser, setMostrar, mostrar}) => {
const [msj, setmsj] = useState('');
let {user, loading, updateToken} = useContext(AuthContext);
let endpoint = `ws://localhost:8000/ws/private/${id}/`;
//const socket = new WebSocket(endpoint + "?token=" + authTokens.access);
const socket = new WebSocket(endpoint + myUser.id);
console.log(socket);

console.log('viene el user');

console.log("Aqui esta " + myUser.id);



function actualizarMsj(e){
    setmsj(e.value)
    }
const readyWebSocket = () => {
socket.onopen = function(e){
    console.log("CONNECTION ESTABLISHED");
    }

socket.onclose = function(e){
        console.log("CONNECTION LOST");
    }

socket.onerror = function(e){
        console.log("ERROR OCCURED");
    }
}
    useEffect(() => {
        if(loading)updateToken();

        readyWebSocket();
    }, [])


socket.onmessage = function(e){
    const data = JSON.parse(e.data);

    if(data){
        setMostrar([...mostrar, 
            {
              msg:data.message,
              name:data.username
            }
          ])
    }
    /*if(data.username == message_username){
        setMostrar([
        ...mostrar,
        {code:
            <td>
                <p className="bg-success p-2 mt-2 mr-5 
                shadow-sm text-white float-right rounded">{data.message}</p>
            </td>}
        ])
    }*/
    
    /*else{
         setMostrar([
        ...mostrar,
            {code:<td>
                <p className="bg-primary p-2 mt-2 mr-5 shadow-sm 
                text-white float-left rounded">{data.message}</p>
            </td>}
        ])
    }*/
}
    const sendMsj= (e) => {
        const message = msj;
        console.log(msj)
    
        socket.send(JSON.stringify({
            'message':message,
            'username':message_username
        }));
    
        setmsj('');
        e.preventDefault();
    }

    return (
        <>
            <div className="col-sm-8 message-area">
                <div className="message-table-scroll">
                    <table className="table">
                        <tbody id='chat-body'>
                            {thread.map( (message, i) => (
                            message.sender == user.username ? (
                            <tr key={i} className="">
                                <td>
                                    <p className="bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">
                                        {message.message}
                                    </p>
                                </td>
                                <td>
                                    <p><small className="p-1 shadow-sm">{message.timestamp}</small>
                                    </p>
                                </td>
                            </tr>)
                            :
                            (<tr key={i}>
                                <td>
                                    <p className="bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">
                                        {message.message}
                                    </p>
                                </td>
                                <td>
                                    <p><small className="p-1 shadow-sm">{message.timestamp}</small>
                                    </p>
                                </td>
                            </tr>)
                            ))}
                            {mostrar.map((mos, i) => (
                                <tr key={i}>
                                    {mos.name == user.username ?
                                    (<Cajitaone data={mos} />):
                                    (<Cajitatwo data={mos} />)}
                                </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                <div className="row message-box p-3" >
                    <div className="col-sm-2 mt-2">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-emoji-smile" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path fillRule="evenodd"
                                d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z" />
                            <path
                                d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                        </svg>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-paperclip mx-2"
                            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                        </svg>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cash" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z" />
                            <path
                                d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                        </svg>
                    </div>
                    <div className="col-sm-8">
                        <input value={msj} onChange={(e)=>actualizarMsj(e.target)} type="text" className="form-control" name="messageinput" placeholder="Write message..."/>
                    </div>
                    <div className="col-sm-2 mt-1">
                        <div className="control">
                            <button onClick={(e) => sendMsj(e)} className="btn btn-success" id="chat-message-submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowMsj;