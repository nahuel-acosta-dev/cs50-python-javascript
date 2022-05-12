import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../contexts/AuthContext';
import GetSala from './GetSala';
import Loading from '../loading/Loading';
import { useParams } from 'react-router-dom';

const Room = () =>{
    const [entrada, setEntrada] = useState(false);
    const [messages, setMessages] = useState([]);
    let {user} = useContext(AuthContext);
    let {room, myuser, id} = useParams();

    const getData = async () => { 
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

    
    

    useEffect(() => {
        getData();
    }, [])


return (
    
    <>
    {!entrada ?
        (<Loading/>):(
        <>{atob(id) == user.user_id ?
            <GetSala roomName={atob(room)} username={atob(myuser)} messages={messages} />
            :
            <h1>Error no se encontro la sala o no estas incluido en el grupo</h1>
        }
        </>
            )
    }
    </>
    )
}

export default Room;