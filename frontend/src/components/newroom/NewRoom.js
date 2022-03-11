import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import ItemService from '../../services/ItemService';
import CreateGroupDetails from './groupdetails/CreateGroupDetails';
import RoomTwo from './RoomTwo';
import {Routes, Route, Navigate, Link} from "react-router-dom";

const NewRoom = () => {
    const [users, setUsers] = useState([]);
    const [myUser, setMyUser] = useState([]);
    const [ocultar, setOcultar] = useState(false);
    const [notEncounter, setNotEncounter] = useState(false);
    const [groupDetails, setGroupDetails] = useState();
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

    let getGroupDetails = async () =>{
        try{
            if(loading)updateToken();
            let response = await ItemService.getItem('group/get_group_details', authTokens);
            if(response.status === 200){
                setGroupDetails(response.data);
                console.log(response.data);
            }else if(response.statusText === 'Unauthorized'){
                logoutUser();
            }
        }
        catch{
            console.log('no se han encontrado grupos');
            setNotEncounter(true)
        }
    }

    let getMyUser = async () =>{
        if(loading)updateToken();
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
        getGroupDetails();
    }, [])
    
    return (
    <>{!ocultar &&
        <>
        <h3>Bienvenido a la seccion de Grupos</h3>
        <p>En esta seccion podras crear tu grupo y luego invitar a quienes tu quieras a el</p></>
        }
        
            <Routes>
                <Route path="invitate" 
                element={groupDetails ? <RoomTwo users={users} myUser={myUser} groupDetails={groupDetails}
                setGroupDetails={setGroupDetails} getGroupDetails={getGroupDetails}
                />: 
                <Navigate to="/newroom/create" />
                } />
                <Route path="create" 
                element={<CreateGroupDetails setOcultar={setOcultar} setGroupDetails={setGroupDetails} 
                groupDetails={groupDetails} notEncounter={notEncounter}/>} />
            </Routes>

            {!ocultar &&
            <>
                <Link to="create" onClick={() => setNotEncounter(false)}>Crear un nuevo Grupo de Ideas</Link> ||
                <Link to="invitate" onClick={() => setOcultar(true)} >Usar tu ultimo grupo activo</Link>
            </>
            }
    </>)

}

export default NewRoom;