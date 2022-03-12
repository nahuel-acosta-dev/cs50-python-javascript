import React, {useEffect, useState, useContext} from 'react';
import Header from '../header/Header';
import AuthContext from "../contexts/AuthContext";
import Cajitaazul from './Cajitaazul';
import Cajitachat from './Cajitachat';

//const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/kakao/`);

const Home = () => {
    let {user} = useContext(AuthContext);
    const [msj,setmsj] = useState('');
    const [converzacion,setconverzacion] = useState([]);
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user.user_id}/`);
    let nombre = user.username;
    console.log(chatSocket);

      function actualizarMsj(e){
        setmsj(e.value);
      }
      
      function enviar(e){
        chatSocket.send(JSON.stringify({
          type:'message',
          message:msj,
          name:nombre
        }))
        setmsj('');
        e.preventDefault();
      }

    let readyWebSocket = () =>{
      chatSocket.onopen = () => {
        console.log('WebSocket conectado');
      };

      chatSocket.onclose = function (evt) {
        console.log(evt.reason);
        console.log('WebSocket desconectado');
        
      };

    }

    useEffect(() =>{
        readyWebSocket();
    }, []);

    chatSocket.onmessage = (message)=>{
        const dataFromserver = JSON.parse(message.data)
        if (dataFromserver){
          
          setconverzacion([...converzacion , 
            {
              msg:dataFromserver.message,
              name:dataFromserver.name
            }
          ])
        }
      }


    return (
    <>
      <h1>Este es el home</h1>
      <Header/>
      <div>
          <div className="pantalla">
            <div id="elCuerpo">
              {converzacion.map((m, i)=>
              <div key={i}>
                {m.name==nombre? 
                    (<Cajitachat data={m} />):
                        (<Cajitaazul data={m}/>)
                    }
              </div>)}
            </div>

            <div className="enviar">
              <input className="chat" type="text" value={msj} onChange={(e)=>actualizarMsj(e.target)}/>
              <button className="botonEnviar" onClick={(e)=>{enviar(e)}}> enviar</button>
            </div>
          </div>
      </div>
    </>
    
    )
}

export default Home;