import React, {useState, useEffect, useContext} from 'react';
import Invitation from './Invitation';
import CreateGroupDetails from './group/CreateGroupDetails';
import ItemContext from '../../contexts/ItemContext';
import PreRoom from './pre-room/PreRoom';
import Room from '../private-room/Room';
import {Routes, Route, Link} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SelectGroup = () => {
    const [groupDetails, setGroupDetails] = useState();  
    const [notEncounter, setNotEncounter] = useState(false);
    const [hide, setHide] = useState(false);
    let {getItemContext} = useContext(ItemContext);

   /* the last active group of the user is obtained, otherwise it is warned that no group was found */
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
        <Row className="cont-select-group animation-cont-select-group align-content-center">
            <Col md={6} className={`select-group ${!hide ? '':'cont-table'}`}>
                {!hide &&
                    <div>
                        <h2>Welcome to the Invitations section.</h2>
                        <p>
                            In this section you can create a group and then invite
                            who you want him.
                        </p>
                    </div>
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
                    <div className="select-groups-cont-links">
                        <Link className="btn btn btn-dark" to="create" onClick={() => setNotEncounter(false)}>Crear un nuevo Grupo de Ideas</Link> 
                        {groupDetails &&
                            groupDetails.active == true ?
                            <Link className="btn btn btn-dark" to="invitate" onClick={() => setHide(true)} >Usar tu ultimo grupo activo</Link>
                            :
                            <Link className="btn btn btn-dark" to="create" onClick={() => setNotEncounter(true)} >Usar tu ultimo grupo activo</Link>
                        }
                        
                    </div>
                }
            </Col>
            <Col className={!hide ? "select-group-cont-img" : "ocultar"}>
                <img src="../../../static/images/group-1962592_640.png"/>
            </Col>
        </Row>
    )
}

export default SelectGroup;