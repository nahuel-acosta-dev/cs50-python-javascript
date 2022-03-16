import React, {useState} from 'react';
import Input from './Input';
import Cajitaazul from './Cajitaazul';
import Cajitachat from './Cajitachat';

const Chat = ({nombre, chatSocket}) => {
    const [converzacion, setconverzacion] = useState([]);
    console.log(converzacion);

      chatSocket.onmessage = (message)=> {
        const dataFromserver = JSON.parse(message.data);
     
        if (dataFromserver){
            setconverzacion([...converzacion, 
              {
                msg:dataFromserver.message,
                name:dataFromserver.name,
              }
            ]);
        }
      }
      
      return(
        <>
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
                <Input chatSocket={chatSocket} nombre={nombre}/>
              </div>
            </div>
        </div>
      </>
      )

}

export default Chat;