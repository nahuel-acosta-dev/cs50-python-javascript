import React, {useState, useContext, useEffect} from 'react';
import ItemService from '../../services/ItemService';
import ResponseService from '../../services/ResponseService';
import AuthContext from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Invitation</th>
                    <th>Groups Create</th>
                    <th>Groups Joined</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                {allUsers.map(user => ( 
                    <tr key={user.id}>
                        <td><Button variant="info">Invitate</Button>{' '}</td>
                        <td>{user.groups_create}</td>
                        <td>{user.groups_joined}</td>
                        <td>@{user.username}</td>
                    </tr>))}
                </tbody>
            </Table>
        </div>
    )
}

export default Invitation;