import React, {useEffect,useContext, useState} from 'react';
import ItemService from '../../../services/ItemService';
import AuthContext from '../../../contexts/AuthContext';
import FormCreate from './FormCreate';
import {Navigate} from "react-router-dom";

const CreateGroupDetails = ({groupDetails, setGroupDetails, setHide, notEncounter}) => {
    let {authTokens} = useContext(AuthContext);
    const [rdtInvitate, setRdtInvitate] = useState(false);

    const updateDetails = async () => {
        let updateBody = {'active': false}
        
        let updateResponse = await ItemService.updateItem(`group/mod_group_details/${groupDetails.id}`, 
            updateBody, authTokens);
        let updateData = await updateResponse.json();
        console.log(updateData);
    }

    const createDetails = async (e) => {
        e.preventDefault();
        let body = {
            'name': e.target.title.value,
            "theme": e.target.theme.value,
            "description": e.target.description.value
        }

        try{
            let response = await ItemService.createItem('group/create_group_details', body, authTokens);

            let data = await response.json();
            if(response.status === 200){
                updateDetails();
                setGroupDetails(data);
                setRdtInvitate(true);
            }
        else if(response.statusText === 'Unauthorized')logoutUser();
        }
        catch{console.log('An error has occurred in one of the requests');}

    }

    useEffect(() => {
        setHide(true);
        return () => setHide(false);
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
            <FormCreate createDetails={createDetails} />
            {rdtInvitate &&
            <Navigate to="/invitation/invitate" />
            }
        </section>

)
}

export default CreateGroupDetails;