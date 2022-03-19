import React from 'react';
import Cajitaazul from './models/Cajitaazul';
import Cajitachat from './models/Cajitachat';

const ApiInvitations = ({invitations, nombre}) => {

    return(
        <>
            {invitations.map((m, i) =>
            <div key={i}>
                {m.name==nombre? 
                    (<Cajitachat data={m} />):
                    (<Cajitaazul data={m}/>)
                }
            </div>)}
        </>
    )

}

export default ApiInvitations;