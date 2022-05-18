import React, {useEffect,useContext, useState} from 'react';
import ItemService from '../../../services/ItemService';
import AuthContext from '../../../contexts/AuthContext';
import FormCreate from './FormCreate';
import {Navigate} from "react-router-dom";

const CreateGroupDetails = ({groupDetails, setGroupDetails, setHide, notEncounter}) => {
    let {authTokens} = useContext(AuthContext);
    const [rdtInvitate, setRdtInvitate] = useState(false);

    //the last active group is deactivated
    const updateDetails = async () => {
        let updateBody = {'active': false}
        
        let updateResponse = await ItemService.updateItem(`group/mod_group_details/${groupDetails.id}`, 
            updateBody, authTokens);
        let updateData = await updateResponse.json();
        console.log(updateData);
    }

    //a new group is created
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
            <div className="not-encounter-group">
                <p>No active groups belonging to your profile have been found</p>
                <p>Then you can create a new one</p>
            </div>:null}
            <div className="title-group">
                <h4>Create Description Group</h4>
            </div>
            <FormCreate createDetails={createDetails} />
            {rdtInvitate &&
            <Navigate to="/invitation/invitate" />
            }
        </section>

)
}

export default CreateGroupDetails;