import React, {useEffect,useContext, useState} from 'react';
import ItemService from '../../../services/ItemService';
import AuthContext from '../../contexts/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import {Navigate} from "react-router-dom";

const CreateGroupDetails = ({ setGroupDetails, groupDetails, setOcultar, notEncounter}) => {
    let {loading, updateToken, authTokens} = useContext(AuthContext);
    const [back, setBack] = useState(false);
    const [redInvitate, setRedInvitate] = useState(false);

    const details = async (e) => {
        e.preventDefault();
        let body = {
            'name': e.target.title.value,
            "theme": e.target.theme.value,
            "description": e.target.description.value
        }

        let updateBody = {
            'active': false
        }

        try{
        let response = await ItemService.createItem('group/create_group_details', body, authTokens);

        let data = await response.json();
        if(response.status === 200){
            let updateResponse = await ItemService.updateItem(`group/mod_group_details/${groupDetails.id}`, 
            updateBody, authTokens);
            let updateData = await updateResponse.json();
            console.log(updateData);
            setGroupDetails(data);
            setRedInvitate(true);
        }

        else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }}
        catch{
            console.log('An error has occurred in one of the requests')
            setBack(true);
        }

    }

    useEffect(() => {
        if(loading) updateToken();
        setOcultar(true);
    }, [])

return (
    <section className="creategroupdetails">
        {notEncounter ?
        <div>
            <p>No se han encontrado grupos activos pertenecientes a tu perfil</p>
            <p>A continuacion podras crear uno nuevo</p>
        </div>:null}
        <div>
            <h1>Create Description Group</h1>
        </div>
        <Form onSubmit={e => details(e)} >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Insert Title" name="title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Theme</Form.Label>
                <Form.Control type="text" placeholder="Insert Theme" name="theme" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Insert Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
        {redInvitate &&
        <Navigate to="/newroom/invitate" />
        }
        {back && 
            <Navigate to="/" />
        }
    </section>
    
)

}

export default CreateGroupDetails;