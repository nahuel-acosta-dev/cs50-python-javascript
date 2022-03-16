import React, {useState} from 'react';
import ReInvitations from '../reinvitations/ReInvitations';

const Loading = () => {
    const [loading, setLoading] = useState(false);

        setTimeout(() =>{
            setLoading(true);
        }, 2000);
    

    const newLocal = <ReInvitations />;
    return (
    <div>{!loading ? 
        (<p>cargando</p>):
        (newLocal)
        }
    </div>
    )

}
    



export default Loading;