import React, {useState, useContext, useEffect} from 'react';
import ItemContext from '../../../contexts/ItemContext';
import AuthContext from '../../../contexts/AuthContext';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../loading/Loading';
import MyUser from './showusers/MyUser';
import OtherUser from './showusers/OtherUser';

const LoadingModal = ({groupId, chatSocket}) => {
    const [show, setShow] = useState(true);
    const [group, setGroup] = useState();
    let {user} = useContext(AuthContext);
    let {getItemContext} = useContext(ItemContext);

    const getGroupDetails = () => {
        try{
            getItemContext(`group/get_id_Group_Details/${groupId}`, setGroup);
        }
        catch{
            console.log('group not found');
        }
    }

    const reloadItemGroupDetails = () => {
        for(let i = 0; i < 3;i++){
            (function(i){
                let myInterval = setInterval(() => getGroupDetails(), 5000);

                if(group.user1 !== null && group.user1 === user.user_id){
                    clearInterval(myInterval);}

                else if(group.user2 !== null && group.user2 === user.user_id){
                    clearInterval(myInterval);}

                if(i === 2 && group.user1 === null && group.user2 === null){
                    return (<h3>Ocurrio un error el intentar integrarte al grupo</h3>)}
            })(i);
        }
    }

    if(groupType === 'ready')getGroupDetails();

    
    useEffect(() => {
        setTimeout(() => getGroupDetails(), 5000);

        chatSocket.close(1500, 'invitation accepted, waiting in waiting room')

        return () => setGroup();
    }, [])
  
  
    return (
      <>
        <Modal show={show} fullscreen={'xxl-down'} onHide={() => setShow(false)}>
          {!group ?
          <Loading />
          :  
          <>
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className="row">
                    <div className="col-6">
                        <MyUser group={group} reloadItemGroupDetails={reloadItemGroupDetails}/>
                        <OtherUser group={group} reloadItemGroupDetails={reloadItemGroupDetails} />
                    </div>
                    <div className="col-6">{group.user_username}</div>
                    </section>
            </Modal.Body>
          </>}
        </Modal>
      </>
    );
    
}

export default LoadingModal;