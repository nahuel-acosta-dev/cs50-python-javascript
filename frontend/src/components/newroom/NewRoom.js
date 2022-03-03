import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import ItemService from '../../services/ItemService';
import RoomTwo from './RoomTwo';

const NewRoom = () => {
    const [users, setUsers] = useState([]);
    const [myUser, setMyUser] = useState([]);
    let {authTokens, logoutUser, loading, updateToken, user} = useContext(AuthContext);

    let getUsers = async () =>{
        if(loading)updateToken()
        let response = await ItemService.getItem('allusers', authTokens);

        if(response.status === 200){
            setUsers(response.data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }
    }

    let getMyUser = async () =>{
        if(loading)updateToken()
        let response = await ItemService.getItem('user', authTokens);

        if(response.status === 200){
            setMyUser(response.data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }
    }


    useEffect(() => {
        if(loading)updateToken();
        getUsers();
        getMyUser();
    }, [])
    
    return (
    <>
    <RoomTwo users={users} myUser={myUser}/>
    </>)

}

export default NewRoom;