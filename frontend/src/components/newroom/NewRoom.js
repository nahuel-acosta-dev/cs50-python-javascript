import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import ItemService from '../../services/ItemService';
import RoomTwo from './RoomTwo';
import axios from 'axios';

const NewRoom = () => {
    const [users, setUsers] = useState([])
    let {authTokens, logoutUser, loading, updateToken} = useContext(AuthContext);

    let getUsers = async () =>{
        if(loading)updateToken()
        let response = await ItemService.getItem('allusers', authTokens);

        if(response.status === 200){
            setUsers(response.data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }
    }
    useEffect(() => {
        if(loading)updateToken();
        getUsers();
    }, [])
    
    return (
    <>
        <RoomTwo users={users} />
    </>)

}

export default NewRoom;