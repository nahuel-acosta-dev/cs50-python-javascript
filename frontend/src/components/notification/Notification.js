import React, {useEffect, useState, useContext} from 'react';
import ItemService from '../../services/ItemService';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';

const Notification = () => {
    let{logoutUser, user, loading, updateToken} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [invitation, setInvitation] = useState(false);
    const [restInvitation, setRestInvitation] = useState({
        'invitation1':false,
        'invitation2':false
    })
    const userSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user.username}/`);

    let getUsers = async () =>{
        let response = await axios.get('http://localhost:8000/capstone_api/allusers');

        if(response.status === 200){
            setUsers(response.data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }

    }

    let createInvitation = async (id) =>{
        if(!restInvitation.invitation1 && !restInvitation.invitation2){
            return alert('el usuario ah rechazado tu invitacion');
        }
        
        if(invitation === false){
            /**/
            let response = await axios.post('http://localhost:8000/capstone_api/',
            {
                method: "POST",
                body: JSON.stringify({
                    'user1': id
                })
                ,headers: {
                    "Accept": "*/*"
                  }
            });


        }
    }

    useEffect(() => {
        if(loading)updateToken();
        getUsers();
    },[])
    return(
        <>
            <lu>
                {users.map(user => (
                    <>
                    <li key={user.id}>
                        {user.username}
                        <button onClick={()=>createInvitation(user.id)}>Invitar</button>
                    </li>
                    
                    </>
                ))}
            </lu>

        </>
    )
}

export default Notification;