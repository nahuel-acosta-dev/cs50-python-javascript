import React, {useState} from 'react';
import ApiInvitations from './ApiInvitations';
import Cajitaazul from './models/Cajitaazul';
import Cajitachat from './models/Cajitachat';

const Chat = ({nombre, myId,chatSocket, invitations}) => {
    const [converzacion, setconverzacion] = useState([]);
    const [setResponse, response] = useState(false);
    console.log(converzacion);

      function enviar(e, answer){
        chatSocket.send(JSON.stringify({
          type:'message',
          type_message: 'response',
          response: answer,
          name:nombre,
          group_id:converzacion[converzacion.length - 1],
          user_id:myId,
          title:'null',
          theme:'null',
          description:'null'
        }))
        e.preventDefault();
      }

      chatSocket.onmessage = (message)=> {
        const dataFromserver = JSON.parse(message.data);
        if (dataFromserver){
            setconverzacion([...converzacion, 
              {
                type: dataFromserver.type_message,
                msg:dataFromserver.response,
                name:dataFromserver.name,
                id: dataFromserver.group_id
              }
            ]);
        }
      }
      
      return(
        <>
        <div>
            <div className="pantalla">
              <div id="elCuerpo">
                <div className="contMessage">
                  {!invitations ?
                  null:
                  (<ApiInvitations invitations={invitations} nombre={nombre}/>)}

                    {converzacion.map((m, i)=>
                    <div key={i}>
                      {m.name==nombre? 
                          (<Cajitachat data={m} response={response}/>):
                              (<Cajitaazul data={m} enviar={enviar} setResponse={setResponse}/>)
                          }
                    </div>)}
                  </div>
              </div>
            </div>
        </div>
      </>
      )

}

export default Chat;