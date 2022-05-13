import React, {useState, useEffect, memo, useRef} from 'react';
import ApiInvitations from './ApiInvitations';
import Cajitaazul from './models/Cajitaazul';
import Cajitachat from './models/Cajitachat';
import LoadingModal from './Modal/LoadingModal';
import Row from 'react-bootstrap/Row'

const Invitations = ({nombre, myId,chatSocket, invitations}) => {
    const endpagemap = useRef(null);
    const [converzacion, setconverzacion] = useState([]);
    const [groupId, setGroupId] = useState();
    const [response, setResponse] = useState(false);
    console.log(converzacion);

      function enviar(e, answer){
        chatSocket.send(JSON.stringify({
          type:'message',
          type_message: 'response',
          response: answer,
          name:nombre,
          group_id:converzacion[converzacion.length - 1].id,
          user_id:myId,
          title:'null',
          theme:'null',
          description:'null'
        }))
        if(answer)setGroupId(converzacion[converzacion.length - 1].id);
        //Hay un error al tomar el ultimo converzacion, ya que si me envia otra invitacion otro usuario
        //antes de responder se reemplazaria el grupo al que quiero responder
        //Creo q No hay error, ya que solo toma el grupo si es true
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


      useEffect(() => {
        return () => {
        setGroupId();
        setResponse(false);}
      }, [])

      useEffect(() => {
        endpagemap.current?.scrollIntoView();
      }, [converzacion])


      return(
        <Row>
          <h3 className="title-invitations">Invitations</h3>
            <div className="pantalla">
                
                <div id="elCuerpo">
                  <div className="contMessage">
                    {!invitations ?
                    null :
                    (<ApiInvitations invitations={invitations} nombre={nombre}/>)}

                      {converzacion.map((m, i) =>
                      <div key={i}>
                        {m.name == nombre ? 
                            (<Cajitachat data={m}/>):
                                (<Cajitaazul data={m} enviar={enviar} setResponse={setResponse}/>)
                            }
                      </div>)}
                            
                      <div ref={endpagemap} />
                      
                    </div>
                </div>
            </div>

            {response &&
                <LoadingModal groupId={groupId} chatSocket={chatSocket}/>
              }                        
        </Row>
      )

}

export default memo(Invitations);