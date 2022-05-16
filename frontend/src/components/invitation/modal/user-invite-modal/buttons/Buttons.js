import React, {useContext} from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';


const Buttons = ({closeOnHide, chatSocket, setStateInvitation, group}) => {
    let {user} = useContext(AuthContext);

    function enviar(e){
        chatSocket.send(JSON.stringify({
          type:'message',
          type_message: 'invitation',
          response:`Invitacion de ${user.username}`,
          name:user.username,
          group_id:group.id,
          user_id:'null',
          title: group.name,
          theme: group.theme,
          description: group.description
        }))
        setStateInvitation(true);

        setInterval(() => {
            chatSocket.close(1000, 'no responsing');
            console.log('Fue el intervalo');
        }, 10000);
        
        e.preventDefault();
      }


    return(
        <>
            <Button className="btn-modal" variant="danger" onClick={(e) => enviar(e)}>invite</Button>
            <Button onClick={closeOnHide}>Close</Button>
        </>
    )
}

export default Buttons;