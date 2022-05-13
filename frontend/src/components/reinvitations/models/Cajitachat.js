import React from 'react';

export default function Cajitachat(props){
    console.log('el siguiente es');

    return(
        <div className="cont-response">
            <div className="text-response">
                {props.data.msg === 'True' || props.data.msg === true? 
                <span>Has aceptado la propuesta</span>:
                <span>Has rechazado la propuesta</span>
            }</div>
        </div>
    )
}
