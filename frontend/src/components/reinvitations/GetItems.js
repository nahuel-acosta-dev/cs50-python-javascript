import React, {useState, useEffect, useContext} from 'react';
import ItemContext from '../../contexts/ItemContext';
import ReInvitations from './ReInvitations';
import Loading from '../loading/Loading';

const GetItems = () => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(false);
    let {getItemContext} = useContext(ItemContext);

    const getInvitations = async () => {

        try{getItemContext('allinvitations', setInvitations);}
        catch{
            console.log('no invitations found');
            setInvitations(false);
        }
        }
    

    setTimeout(() =>{
        setLoading(true);
    }, 2000);


    useEffect(() => {
        getInvitations();
        return () => setInvitations([]);
    }, []);

    return (
        <>
            {!invitations || !loading ?
            <Loading />:
            <ReInvitations invitations={invitations}/>}
        </>
    )
}

export default GetItems;