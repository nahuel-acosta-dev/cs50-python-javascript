import React, {useState} from 'react';

const Input = ({chatSocket, nombre}) =>{
    const [msj,setmsj] = useState('');

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



return (
    <>
        <input className="chat" type="text" value={msj} onChange={(e)=>actualizarMsj(e.target)}/>
        <button className="botonEnviar" onClick={(e)=>{enviar(e)}}> enviar</button>
    </>
)

}

export default Input;