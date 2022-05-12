import React, {useState, useEffect, useContext, memo} from 'react';
import Modal from 'react-bootstrap/Modal';
import LoadUsers from './loadusers/LoadUsers';
import LoadRoute from './loadusers/LoadRoute';
import AuthContext from '../../../contexts/AuthContext';
import ItemContext from '../../../contexts/ItemContext';
import Loading from '../../loading/Loading';



const LoadingModal = ({groupId, chatSocket}) => {
    const [show, setShow] = useState(true);
    const [group, setGroup] = useState();
    let {getItemContext} = useContext(ItemContext);
    let {user} = useContext(AuthContext);
    let myUser = user.user_id;
    let myUsername = user.username;

    const getGroupDetails = () => {
      try{getItemContext(`group/get_id_Group_Details/${groupId}`, setGroup);}
      catch{
          console.log('group not found');
      }
  }


    useEffect(() => {
      if(group)console.log(group);
      else setTimeout(getGroupDetails(), 5000)
      chatSocket.close(1000, 'invitation accepted, waiting in waiting room');   
    }, []);

    return (
      <>
      
      {!group ?
        <Loading />
        :
        <Modal show={show} fullscreen={'xxl-down'} onHide={() => setShow(false)}>
        {
          <LoadRoute group={group} getGroupDetails={getGroupDetails} 
          myUser={myUser} myUsername={myUsername} setShow={setShow}/>
        }
        </Modal>}
      </>
    );
    
}

export default memo(LoadingModal);