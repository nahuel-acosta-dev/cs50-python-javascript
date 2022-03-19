import React, {useState} from 'react';

const Input = ({chatSocket, nombre, myId, group}) =>{
    const [msj,setmsj] = useState('');

    function actualizarMsj(e){
        setmsj(e.value);
      }

      function enviar(e){
        chatSocket.send(JSON.stringify({
          type:'message',
          type_message: 'response',
          response:msj,
          name:nombre,
          group_id:group.id,
          user_id:myId,
          title:'null',
          theme:'null',
          description:'null'
        }))
        setmsj('');
        e.preventDefault();
      }



return (
    <>
        <input className="chat" type="text" value={msj} onChange={(e)=>actualizarMsj(e.target)}/>
        <button className="botonEnviar" type="submit" onClick={(e)=>{enviar(e)}}> enviar</button>
    </>
)

}

export default Input;