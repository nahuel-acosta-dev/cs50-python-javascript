import React,{memo} from 'react';

export default memo(function Cajitachat(props){
    console.log('el siguiente es');

    return(
        <div className="cajitachat">
            <div className="textoCajita">
                {props.data.msg === 'True' || props.data.msg === true? 
                <span>Has aceptado la propuesta</span>:
                <span>Has rechazado la propuesta</span>
            }</div>
            <div className="avatar">
                <h1>{props.data.name.toUpperCase()[0]}</h1>
            </div>
            

        </div>
    )
}
)