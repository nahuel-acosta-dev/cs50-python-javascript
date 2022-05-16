import React from 'react';

export default function Cajitachat(props){

    return(
        <div className="cont-response">
            <div className="text-response">
                {props.data.msg === 'True' || props.data.msg === true? 
                <span>You have accepted the proposal</span>:
                <span>You have rejected the proposal</span>
            }</div>
        </div>
    )
}
