import React, {useContext, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import ShowMsj from './ShowMsj';
import ItemService from '../../services/ItemService';

const RoomTwo = ({users, myUser}) =>{
let {user, updateToken, loading, authTokens} = useContext(AuthContext);
const [contact, setContact] = useState([]);
const [thread, setThread] = useState([]);
const [mostrar, setMostrar] = useState([]);
const [socket, setSocket] = useState();
const message_username = user.username;


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


const getContact = async (otherUser) => {
    setContact(otherUser);
    setMostrar([]);
    let endpoint = `ws://localhost:8000/ws/private/${otherUser.id}/`;
    setSocket(new WebSocket(endpoint + myUser.id));
    return await getThreads(otherUser);
}


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
            <>
            {contact.username != undefined ?
                <ShowMsj id={contact.id} myUser={myUser} setMostrar={setMostrar}
                mostrar={mostrar} thread={thread} socket={socket}
                message_username={message_username}/> : null
                }
            </>
        </div>
        
    </div>
</div>
    )
}

export default RoomTwo;