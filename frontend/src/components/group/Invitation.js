import React, {useState, useContext, useEffect} from 'react';
import ItemService from '../../services/ItemService';
import ResponseService from '../../services/ResponseService';
import AuthContext from "../contexts/AuthContext";
import TableUsers from './table/TableUsers';
import FormUsers from './form/FormUsers';

const Invitation = () => {
    const [allUsers, setAllUsers] = useState([]);
    let {logoutUser, loading, updateToken, authTokens} = useContext(AuthContext);

    const getUsers = async () =>{
        let response = await ItemService.getItem("allusers", authTokens);
        ResponseService.Response(response, setAllUsers, logoutUser);
    }

    useEffect(() => {
        if(loading)updateToken();
        getUsers();
    }, []);

    return(
        <div>
            <FormUsers />
            <TableUsers allUsers={allUsers}/>
        </div>
    )
}

export default Invitation;