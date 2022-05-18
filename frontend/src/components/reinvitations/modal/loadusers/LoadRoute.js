import React, {useState} from 'react';
import LoadUsers from './LoadUsers';
import {Routes, Route, Link} from 'react-router-dom';

const LoadRoute = ({group, getGroupDetails, myUser, myUsername, setShow}) => {
    const [hide,setHide] = useState(false);

    return (
        <>
        <Routes>
            <Route path='/loading-users' element={<LoadUsers group={group} getGroupDetails={getGroupDetails} 
          myUser={myUser} myUsername={myUsername} setShow={setShow}/>}/>
        </Routes>
        {!hide &&
            <Link to='loading-users' className='btn btn-warning' onClick={() => setHide(true)}>Ready to start?</Link>
        }
        </>
    )

}

export default LoadRoute;