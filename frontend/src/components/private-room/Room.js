import React, {useState, useEffect, useContext, memo} from 'react';
import AuthContext from '../../contexts/AuthContext';
import ItemContext from '../../contexts/ItemContext';
import GetSala from './GetSala';
import Loading from '../loading/Loading';
import { useParams } from 'react-router-dom';

const Room = () =>{
    const [entrada, setEntrada] = useState(false);
    const [messages, setMessages] = useState([]);
    const [groupDetails, setGroupDetails] = useState();
    let {user, authTokens} = useContext(AuthContext);
    let {room, myuser, id} = useParams();
    let {getItemContext} = useContext(ItemContext);

    console.log("es el siguiente")
    let roomNameArray = atob(room).slice(6).split("_");
    let creatorUsername = roomNameArray[0];
    console.log(creatorUsername);
    
    //function to get all messages in the room
    const getData = async () => { 
        console.log(atob(room));
        console.log(atob(id));
        let response = await fetch(`http://127.0.0.1:8000/capstone_api/messages/${atob(room)}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              }
        })
    
        let data = await response.json();
    
        if(response.status === 200){
            setMessages(data);
            console.log(messages);
        }
        else{
            console.log('error getting api data');
        }
        
        setEntrada(true);
        
    }


    //you get the group
    const getGroupDetails = () => {
        try{getItemContext(`group/get_group_details`, setGroupDetails);}
        catch{
            console.log('group not found');
        }
    }
  

    //functino needed to deactivate the group after the room is finished
    const desactiveGroupDetails = async () =>{
        let response = await fetch(`http://127.0.0.1:8000/capstone_api/group/desactive_group_details/${groupDetails.id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
    
        let data = await response.json();
    
        if(response.status === 200){
            setGroupDetails(data);
            console.log(data)
        }
        else{
            console.log('error modifying api');
        }

    }


    useEffect(() => {
        getData();
        getGroupDetails();
    }, [])


return (
    
    <>
    {!entrada ?
        (<Loading/>):(
        <>{atob(id) == user.user_id ?
            <GetSala roomName={atob(room)} username={atob(myuser)} messages={messages} 
            setMessages={setMessages} desactiveGroup={desactiveGroupDetails} group={groupDetails}
            creatorUsername = {creatorUsername}
            />
            :
            <div className="cont-err">
                <h4 className="err-h4">Error the room was not found or you are not included in the group</h4>
            </div>
        }
        </>
            )
    }
    </>
    )
}

export default memo(Room);