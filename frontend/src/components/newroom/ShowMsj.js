import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import Cajitaone from './model/Cajitaone';
import Cajitatwo from './model/Cajitatwo';
import ResponseUser from './model/ResponseUser';
import Room from '../room/Room';
import ItemService from '../../services/ItemService';
import {Routes, Route, Navigate} from "react-router-dom";

const ShowMsj = ({thread, myUser,setMostrar, mostrar, socket, groupDetails, setGroupDetails, getGroupDetails}) => {
const [redirect, setRedirect] = useState(false);
const [response, setResponse] = useState({
    invitation1:false,
    invitation2:false
});
const [room, setRoom] = useState();
let {user, authTokens} = useContext(AuthContext);
const message_username = user.username;

if(response.invitation1 && response.invitation2)setRedirect(true);

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
    readyWebSocket();
}, []);

const addUserGroups = async (user_id) => {
    let invitation = {
        'invitation': true,
        'user': user_id 
    }

    let response = await ItemService.updateItem(`group/mod_group_details/${groupDetails.id}`,
    invitation ,authTokens);
    let data = await response.json();

    if(response.status === 200) {
        console.log('entro aca');
        setGroupDetails(data);
    }
    else if(response.statusText === 'Unauthorized'){
        logoutUser();
    }
}


socket.onmessage = function(e){
    const data = JSON.parse(e.data);
    if(data){
        console.log(data.response);
        if(data.model == 'response'){
            setMostrar([...mostrar, 
                {
                    model: data.model,
                    response:data.response,
                    name:data.username
                }]
            )
            console.log(data.response);
            if(data.response === true && data.username !== user.username)addUserGroups(data.user_id);
            if(response.invitation1 == false)setResponse({...response,invitation1:true});
            else if(response.invitation2 == false)setResponse({...response,invitation2:true});
            console.log(response);
        }
        else if(data.model == 'invitation'){
            setMostrar([...mostrar, 
                {
                    model: data.model,
                    title:data.title,
                    theme:data.theme,
                    description:data.description,
                    response:data.response,
                    name:data.username
                }
            ])
            setRoom(`${data.title}${data.username}`)
        }
        else{
            return alert('error al identificari el tipo de mensaje')
        }
    }
}
    const sendMsj= (e, model, value) => {
        if(model === 'response'){
        socket.send(JSON.stringify({
            'model':model,
            'title':'null',
            'theme':'null',
            'description':'null',
            'response':value,
            'username':message_username,
            'user_id': myUser.id
        }));

        if(value === true)setRedirect(true);
    }

    else if(model === 'invitation'){
        socket.send(JSON.stringify({
            'model':model,
            'title':groupDetails.name,
            'theme':groupDetails.theme,
            'description':groupDetails.description,
            'response':'null',
            'username':message_username,
            'user_id':'null'
        }));
    }

    else return console.log('Revisa el codigo');

    e.preventDefault();
    }

    return (
        <>
            <div className="col-sm-8 message-area">
                <div className="message-table-scroll">
                    <table className="table">
                        <tbody id='chat-body'>
                            {thread.map((message, i) => (
                            message.sender == user.username ? (
                            <tr key={i} className="">
                                <Cajitaone data={message} />
                            </tr>)
                            :
                            (<tr key={i}>
                                <ResponseUser data={message} />
                            </tr>)
                            ))}
                            {mostrar.map((mos, i) => (
                                <tr key={i}>
                                    {mos.name == user.username ? 
                                    (
                                    <Cajitaone data={mos} />
                                    ):
                                    (<Cajitatwo data={mos} sendMsj={sendMsj} />)}
                                </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                <div className="row message-box p-3" >
                    <div className="col-sm-2 mt-1">
                        <div className="control">
                            <button onClick={(e) => sendMsj(e, 'invitation')} 
                            className="btn btn-success" id="chat-message-submit">Invitar</button>
                        </div>
                    </div>
                </div>
            </div>

            <Routes>
                <Route path="/room" 
                element={<Room room={room} groupDetails={groupDetails}/>} />
            </Routes>

            {
                redirect &&
                <Navigate to="/room" />
            }                            
        </>
    )
}

export default ShowMsj;