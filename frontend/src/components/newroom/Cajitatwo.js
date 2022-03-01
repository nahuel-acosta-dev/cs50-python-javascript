import React from 'react';

export default function Cajitatwo(props){

    return(
        <td>
            <p className="bg-primary p-2 mt-2 mr-5 shadow-sm 
            text-white float-left rounded">{props.data.msg}</p>
        </td>
    )
}
