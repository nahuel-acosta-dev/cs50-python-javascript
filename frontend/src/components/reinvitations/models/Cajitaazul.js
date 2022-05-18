import React, {useState} from 'react';
import Buttons from './Buttons';

export default function Cajitaazul(props){
    
    return(
        <div className="cajitachat">
            <div className="textoCajita">
                <div className="row subCajitaAzul">
                    <div className="row">{props.data.msg}</div>
                    <div className="row">
                        
                   
                    {props.data.type === 'invitation' &&
                        <Buttons enviar={props.enviar} setResponse={props.setResponse} data={props.data}/>
                    }
                    </div>
                </div>
            </div>
            <div className="avatarAzul">
                {props.data.name.toUpperCase()[0]}
            </div>
        </div>
    )
}
