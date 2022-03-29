import React, {useState, useEffect, useContext} from 'react';
import Invitation from './Invitation';
import CreateGroupDetails from './group/CreateGroupDetails';
import ItemContext from '../../contexts/ItemContext';
import PreRoom from './pre-room/PreRoom';
import Room from '../private-room/Room';
import {Routes, Route, Link} from "react-router-dom";

const SelectGroup = () => {
    const [groupDetails, setGroupDetails] = useState();  
    const [notEncounter, setNotEncounter] = useState(false);
    const [hide, setHide] = useState(false);
    let {getItemContext} = useContext(ItemContext);

    let getGroupDetails = () =>{
        try {getItemContext('group/get_group_details', setGroupDetails);}
            
        catch{
            console.log('no groups found');
            setNotEncounter(true);}
        }
    

    useEffect(() => {
        getGroupDetails();
    }, []);


    return (
        <>

            {!hide &&
                <>
                <h3>Bienvenido a la seccion de Invitaciones</h3>
                <p>En esta seccion podras crear un grupo y luego invitar a quienes tu quieras a el</p></>
            }
            
                <Routes>
                    <Route path="invitate/*" 
                    element={<Invitation groupDetails={groupDetails} setHide={setHide} 
                    getGroup={getGroupDetails}/>} />
                    <Route path="pre_room" 
                    element={<PreRoom groupDetails={groupDetails} setHide={setHide}/>} />
                    <Route path="private_room/room" 
                    element={<Room groupDetails={groupDetails} />} />
                    <Route path="create" 
                    element={<CreateGroupDetails setHide={setHide} setGroupDetails={setGroupDetails} 
                    groupDetails={groupDetails} notEncounter={notEncounter}/>} />
                </Routes>
    
            {!hide &&
                <>
                    <Link to="create" onClick={() => setNotEncounter(false)}>Crear un nuevo Grupo de Ideas</Link> ||
                    <Link to="invitate" onClick={() => setHide(true)} >Usar tu ultimo grupo activo</Link>
                </>
            }
        </>
    )
}

export default SelectGroup;