import React, {useContext, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import ShowMsj from './ShowMsj';
import ItemService from '../../services/ItemService';

const RoomTwo = ({users}) =>{
let {user, updateToken, loading, authTokens} = useContext(AuthContext);
/*const [mostrar, setMostrar] = useState(<tr>
    <td>
        <p className="bg-success p-2 mt-2 mr-5 
        shadow-sm text-white float-right rounded">vacio</p>
    </td>
</tr>);*/
const [contact, setContact] = useState([]);
//const [msj, setmsj] = useState('');
const [thread, setThread] = useState([]);

let getThreads = async (otherUser) =>{
    if(loading)updateToken();
    console.log('viene')
    console.log(otherUser)
    let response = await ItemService.getItem(`newroom/${otherUser.username}`, authTokens);
    console.log(response);
    if(response.status === 200){
        setThread(response.data);
    }else if(response.statusText === 'Unauthorized'){
        logoutUser();
    }
    console.log(thread)
}


/*function actualizarMsj(e){
    setmsj(e.value)
  }*/
  

const message_username = user.username;

//const socket = new WebSocket('ws://'+ window.location.host + '/ws/' + id + '/');
/*const socket = new WebSocket(`ws://localhost:8000/ws/private/${contact.id}/`);
console.log(socket)

socket.onopen = function(e){
    console.log("CONNECTION ESTABLISHED");
}

socket.onclose = function(e){
    console.log("CONNECTION LOST");
}

socket.onerror = function(e){
    console.log("ERROR OCCURED");
}

socket.onmessage = function(e){
    const data = JSON.parse(e.data);
    if(data.username == message_username){
        setMostrar(
        <tr>
            <td>
                <p className="bg-success p-2 mt-2 mr-5 
                shadow-sm text-white float-right rounded">{data.message}</p>
            </td>
        </tr>)
    }else{
         setMostrar(
        <tr>
            <td>
                <p className="bg-primary p-2 mt-2 mr-5 shadow-sm 
                text-white float-left rounded">{data.message}</p>
            </td>
        </tr>)
    }

    console.log("hola" + mostrar)
}*/

const getContact = async (otherUser) => {
    setContact(otherUser);
    return await getThreads(otherUser);
}

/*const sendMsj= (e) => {
    const message = msj;
    console.log(msj)

    socket.send(JSON.stringify({
        'message':message,
        'username':message_username
    }));

    setmsj('');
    e.preventDefault();
}*/

    return(
    <div className="back-container">
    <div className="container-fluid front-container">
        <div className="back-top"></div>
        <div className="back-main"></div>
    </div>
    <div className="container front-container1">
        <div className="row chat-top">
            <div className="col-sm-4 border-right border-secondary">
                <img src="https://publicdomainvectors.org/photos/JAVA.png" alt="" className="profile-image rounded-circle"/>
                <span className="ml-2">{user.username}</span>
                <span className="float-right mt-2">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-circle" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    </svg>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-left-fill mx-3"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    </svg>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical mr-2"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                </span>


            </div>
            <div className="col-sm-8">
                <img src="https://publicdomainvectors.org/photos/JAVA.png" alt="" className="profile-image rounded-circle"/>
                <span className="ml-2">{contact.username}</span>
                <span className="float-right mt-2">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                        <path fillRule="evenodd"
                            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                    </svg>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical mx-3"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                </span>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4 contacts">
                <div className="contact-table-scroll">
                    <table className="table table-hover">
                        <tbody>
                            {users.map(otherUser => (
                            <tr key={otherUser.id}>
                                <td><img src="https://publicdomainvectors.org/photos/JAVA.png" alt="" className="profile-image rounded-circle"/>
                                </td>
                                {/*<td><a href="{% url 'chat' username=user.username %}">{otherUser.username}</a></td>*/}
                                <td><button onClick={() => getContact(otherUser)}>{otherUser.username}</button></td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
            {/*Es desde aqui---------------- */}
            <>
            {contact.username != undefined ?
                <ShowMsj id={contact.id} 
                thread={thread} message_username={message_username}/> : null
                }
            </>
            {/*<div className="col-sm-8 message-area">
                <div className="message-table-scroll">
                    <table className="table">
                        <tbody id='chat-body'>
                            {thread.map( message => (
                            message.sender == user.username ? (
                            <tr key={message.id} className="">
                                <td>
                                    <p className="bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">
                                        {message.message} media
                                    </p>
                                </td>
                                <td>
                                    <p><small className="p-1 shadow-sm">{message.timestamp}</small>
                                    </p>
                                </td>
                            </tr>)
                            :
                            (<tr key={message.id}>
                                <td>
                                    <p className="bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">
                                        {message.message} buena
                                    </p>
                                </td>
                                <td>
                                    <p><small className="p-1 shadow-sm">{message.timestamp}</small>
                                    </p>
                                </td>
                            </tr>)
                            
                            ))}
                            <ShowMsj mostrar={mostrar}/>
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
            </div>*/}
            {/*Hasta aqui---------------- */}
        </div>
        
    </div>
</div>
    )
}

export default RoomTwo;