import React, {useState, useEffect, useContext} from 'react';
import Loading from '../loading/Loading';
import ItemContext from '../../contexts/ItemContext';
import Table from 'react-bootstrap/Table';
import TableUser from './tableuser/TableUser';
import {Navigate} from "react-router-dom";

const Invitation = ({groupDetails, setHide, getGroup}) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    if(groupDetails){
        console.log(groupDetails.active)}

    let {getItemContext} = useContext(ItemContext);

    const getCoins = async () => {
        try{
        getItemContext('allcoins', setCoins);}
        catch{
            console.log('Error loading user coins');}
    }

    setTimeout(() =>{
        setLoading(true);
    }, 2000);

    useEffect(() => {
        setHide(true);
        getCoins(); //get coins 
        return () => setHide(false);
    }, []);

    return(
        <>
        {!coins || !loading ?
            <Loading />
            :            
            <Table striped bordered hover variant="dark" responsive="sm">
                <thead>
                    <tr>                    
                    <th>Invitation</th>
                    <th>Price</th>
                    <th>Coins</th>
                    <th>Username</th>
                    <th>Reload</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(coin => (
                        <TableUser key={coin.id} coin={coin} group={groupDetails}
                        getGroup={getGroup} />
                    ))}
                </tbody>
            </Table>}

            {groupDetails &&
                groupDetails.user1 && groupDetails.user2 &&
                    <Navigate to="/invitation/pre_room" />
            }
        </>
    )

}

export default Invitation;