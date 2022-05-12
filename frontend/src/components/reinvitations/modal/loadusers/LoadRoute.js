import React from 'react';
import LoadUsers from './LoadUsers';
import {Routes, Route, Link} from 'react-router-dom';

const LoadRoute = ({group, getGroupDetails, myUser, myUsername, setShow}) => {


    return (
        <>
        {/*escribir un tutorial de como es el juego y de que debera esperar, a que se esperen los usuarios.
            Solo podra tener el boton opcion empezar
        */}
        <Routes>
            <Route path='/loading-users' element={<LoadUsers group={group} getGroupDetails={getGroupDetails} 
          myUser={myUser} myUsername={myUsername} setShow={setShow}/>}/>
        </Routes>

        <Link to='loading-users' >Listo para empezar?</Link>
        </>
    )

}

export default LoadRoute;