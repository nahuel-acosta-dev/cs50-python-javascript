import React, {memo, useState} from 'react';
import Button from 'react-bootstrap/Button';
import UserModal from '../modal/user-invite-modal/UserModal';

const TableUser = ({coin, group, getGroup}) => {
    const [modalShow, setModalShow] = useState(false);
    console.log('este es el id:' + coin.user['id']);

    return(
        <>
            <tr>
                <td>
                    <Button variant="light" 
                    onClick={() => setModalShow(true)}>Invitate</Button>
                </td>
                <td>{coin.price}</td>
                <td>{coin.coins}</td>
                <td>{coin.user['username']}</td>
                <td colSpan={1}></td>
            </tr>

            <UserModal show={modalShow} user={coin.user} getGroup={getGroup}
            onHide={() => setModalShow(false)} group={group}/>
        </>
    )
}

export default memo(TableUser);