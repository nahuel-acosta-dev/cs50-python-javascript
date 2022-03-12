import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import Table from 'react-bootstrap/Table';
import Header from '../header/Header';
import ItemService from '../../services/ItemService';
import TableUser from './tableuser/TableUser';

const Invitation = () => {
    const [coins, setCoins] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext);

    const getItem = async (url, set) => {
        let response = await ItemService.getItem(url, authTokens);
        if(response.status === 200){
            console.log(response.data);
            set(response.data);}
        else if(response.statusText === 'Unauthorized')logoutUser();
    }

    useEffect(() => {
        getItem('allcoins', setCoins); //get coins 
    }, []);

    return(
        <>
        <Header />
        <Table striped bordered hover variant="info">
                <thead>
                    <tr>
                    <th>Invitation</th>
                    <th>Price</th>
                    <th>First Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(coin => (
                        <TableUser key={coin.id} coin={coin} />
                    ))}
                </tbody>
            </Table>

            
        </>
    )

}

export default Invitation;