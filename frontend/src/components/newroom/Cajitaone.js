import React from 'react';

export default function Cajitaone(props){

    return(
        <td>
            <p className="bg-success p-2 mt-2 mr-5 
            shadow-sm text-white float-right rounded">{props.data.msg}</p>
        </td>
    )
}
