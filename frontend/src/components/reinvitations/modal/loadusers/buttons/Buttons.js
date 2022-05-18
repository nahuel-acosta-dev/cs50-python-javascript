import React, {useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../../../../contexts/AuthContext';
import ItemContext from '../../../../../contexts/ItemContext';
import {useNavigate} from 'react-router-dom';

const Buttons = ({enviar, group, setShow}) => {
    let {user} = useContext(AuthContext);
    let {updateItemContext} = useContext(ItemContext);
    let navigate = useNavigate();

    //we communicate that we exit the rom and return to the invitations section
    const outRoom = (e, message) => {
        let object = {'user': user.user_id};

        try{
            updateItemContext(`group/delete_user_group_details/${group.id}`,object);
            enviar(e, message);
            setShow(false);
            navigate(-1);
            
        }
        catch{
            console.log('error al salir del grupo');}
        
    }

    useEffect(() => {
        setTimeout(() => enviar('newUser'), 5000);
    }, [])


    return (
        <>
            <Button variant="primary" onClick={(e) => enviar(/*e, */'newUser')}>listo</Button>
            <Button variant="danger" onClick={(e) => outRoom(/*e, */'out')}>Salir</Button>
        </>
    )

}

export default Buttons;