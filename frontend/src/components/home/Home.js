import React, {useEffect, useState, useContext} from 'react';
import ItemService from '../../services/ItemService';
import Header from './../header/Header';
import AuthContext from "../contexts/AuthContext";
import Cajitaazul from './Cajitaazul';
import Cajitachat from './Cajitachat';

const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/kakao/`);

const Home = () => {
    const [coins, setCoins] = useState([]);
    let {loading, logoutUser, authTokens, updateToken, user} = useContext(AuthContext);
    const [msj,setmsj] = useState('');
    const [converzacion,setconverzacion] = useState([]);

    let nombre = user.username;

      function actualizarMsj(e){
        setmsj(e.value)
      }
      
      function enviar(e){
        chatSocket.send(JSON.stringify({
          type:'message',
          message:msj,
          name:nombre
        }))
        setmsj('')
        e.preventDefault()
      }
    

    let getCoins = async () =>{
        let response = await ItemService.getItem("coins", authTokens);

        if(response.status === 200){
            setCoins(response.data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }
        
    }

    let readyWebSocket = () =>{
      chatSocket.onopen = () => {
        console.log('WebSocket conectado');
      };
      chatSocket.onclose = function (evt) {
        console.log('WebSocket desconectado');
      };

    }

    useEffect(() =>{

        if(loading){
            updateToken();
        }
        getCoins();

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
      {coins.map(coin => (
        <div key={coin.id}>funciona{coin.coins}</div>
      ))
      }

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