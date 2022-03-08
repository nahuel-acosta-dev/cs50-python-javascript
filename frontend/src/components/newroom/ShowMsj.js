import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import Cajitaone from './model/Cajitaone';
import Cajitatwo from './model/Cajitatwo';

const ShowMsj = ({thread, message_username, setMostrar, mostrar, socket, groupDetails}) => {
const [msj, setmsj] = useState('');
let {user, loading, updateToken} = useContext(AuthContext);

function actualizarMsj(e){
    setmsj(e.value)
    }

const readyWebSocket = () => {

    socket.onopen = function(e){
        console.log("CONNECTION ESTABLISHED");
        }

    socket.onclose = function(e){
            console.log("CONNECTION LOST");
        }

    socket.onerror = function(e){
            console.log("ERROR OCCURED");
        }
}

    useEffect(() => {
        if(loading)updateToken();

        readyWebSocket();
    }, [])


socket.onmessage = function(e){
    const data = JSON.parse(e.data);

    if(data){
        console.log(data.message)
        if(data.model == 'response'){
        setMostrar([...mostrar, 
            {
              model: data.model,
              msg:data.message,
              name:data.username
            }
          ])}
        else if(data.model == 'invitation'){
        setMostrar([...mostrar, 
            {
                model: data.model,
                title:data.title,
                theme:data.theme,
                description:data.description,
                msg:data.message,
                name:data.username
            }
        ]) 
        }
        else{
            return alert('error al identificari el tipo de mensaje')
        }
    }
}
    const sendMsj= (e, model, value) => {
        console.log(value);
        console.log(groupDetails.description);
        if(model === 'response'){
        socket.send(JSON.stringify({
            'model':model,
            'title':'null',
            'theme':'null',
            'description':'null',
            'message':value,
            'username':message_username
        }));
    }

    else if(model === 'invitation'){
        socket.send(JSON.stringify({
            'model':model,
            'title':groupDetails.name,
            'theme':groupDetails.theme,
            'description':groupDetails.description,
            'message':'null',
            'username':message_username
        }));
    }

    else return console.log('Revisa el codigo')

        setmsj('');
        e.preventDefault();
    }

    return (
        <>
            <div className="col-sm-8 message-area">
                <div className="message-table-scroll">
                    <table className="table">
                        <tbody id='chat-body'>
                            {thread.map( (message, i) => (
                            message.sender == user.username ? (
                            <tr key={i} className="">
                                <td>
                                    <p className="bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">
                                        {message.message}
                                    </p>
                                </td>
                                <td>
                                    <p><small className="p-1 shadow-sm">{message.timestamp}</small>
                                    </p>
                                </td>
                            </tr>)
                            :
                            (<tr key={i}>
                                <td>
                                    <p className="bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">
                                        {message.message}
                                    </p>
                                </td>
                                <td>
                                    <p><small className="p-1 shadow-sm">{message.timestamp}</small>
                                    </p>
                                </td>
                            </tr>)
                            ))}
                            {mostrar.map((mos, i) => (
                                <tr key={i}>
                                    {mos.name == user.username ? 
                                    (
                                    <Cajitaone data={mos} />
                                    ):
                                    (<Cajitatwo data={mos} sendMsj={sendMsj} />)}
                                </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                <div className="row message-box p-3" >
                    <div className="col-sm-8">
                        <input value={msj} onChange={(e)=>actualizarMsj(e.target)} type="text" className="form-control" name="messageinput" placeholder="Write message..."/>
                    </div>
                    <div className="col-sm-2 mt-1">
                        <div className="control">
                            <button onClick={(e) => sendMsj(e, 'invitation')} className="btn btn-success" id="chat-message-submit">Invitar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowMsj;