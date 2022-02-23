import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const TableUsers = ({allUsers}) => {
    
    return (
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
    )
}

export default TableUsers;