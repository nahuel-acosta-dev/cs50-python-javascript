import React, {useContext, useState} from 'react';
import AuthContext from '../../contexts/AuthContext';
import ShowMsj from './ShowMsj';
import ItemService from '../../services/ItemService';

const RoomTwo = ({users, myUser, groupDetails, setGroupDetails, getGroupDetails}) =>{
let {user, updateToken, loading, authTokens} = useContext(AuthContext);
const [contact, setContact] = useState([]);
const [thread, setThread] = useState([]);
const [mostrar, setMostrar] = useState([]);
const [socket, setSocket] = useState();

let getThreads = async (otherUser) => {
    if(loading)updateToken();
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
            </div>
            <div className="col-sm-8">
                <img src="https://publicdomainvectors.org/photos/JAVA.png" alt="" className="profile-image rounded-circle"/>
                <span className="ml-2">{contact.username}</span>
            </div>
        </div>
        <div>
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
                                <td><button onClick={() => getContact(otherUser)}>{otherUser.username}</button></td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <>
            {contact.username != undefined ?
                <ShowMsj setMostrar={setMostrar} groupDetails={groupDetails} setGroupDetails={setGroupDetails}
                mostrar= {mostrar} thread={thread} socket= {socket} 
                myUser={myUser} getGroupDetails={getGroupDetails}/> : null
                }
            </>
        </div>
    </div>
</div>
    )
}

export default RoomTwo;