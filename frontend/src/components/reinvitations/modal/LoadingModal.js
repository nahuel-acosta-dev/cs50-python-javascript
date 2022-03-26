import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import LoadUsers from './loadusers/LoadUsers';
import ItemContext from '../../../contexts/ItemContext';
import Loading from '../../loading/Loading';

const LoadingModal = ({groupId, chatSocket}) => {
    const [show, setShow] = useState(true);
    const [group, setGroup] = useState();
    let {getItemContext} = useContext(ItemContext);

    const getGroupDetails = () => {
      try{
          getItemContext(`group/get_id_Group_Details/${groupId}`, setGroup);
      }
      catch{
          console.log('group not found');
      }
  }


    useEffect(() => {
        setTimeout(() => getGroupDetails(), 4000);
        chatSocket.close(1000, 'invitation accepted, waiting in waiting room');

        return () => setGroup();
    }, [])
  
  
    return (
      <>
        <Modal show={show} fullscreen={'xxl-down'} onHide={() => setShow(false)}>
        {
          !group ?
          <Loading />
          :
          <LoadUsers group={group} getGroupDetails={getGroupDetails}/>
        }
        </Modal>
      </>
    );
    
}

export default LoadingModal;