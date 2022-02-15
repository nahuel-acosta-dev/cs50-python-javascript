import React from 'react';
import Register from './../session/Register';
import Login from './../session/Login';
import Home from './../home/Home';


import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link, 
    Navigate} from "react-router-dom";

const RoutesSession = ({loginUser, setUser, user, logoutUser}) => {

    return (
    <Router>
            <Routes>
                <Route exact path="/" element={!user ?<Navigate to="/login"/> : 
                <Home user={user} logoutUser={logoutUser}/>} />
                <Route exact path="/register" element={<Register setUser={setUser}/>}/>
                <Route exact path="/login" element={user ? <Navigate to="/"/> : <Login 
                loginUser={loginUser} user={user}/>}/>
            </Routes>
    </Router>)

}

export default RoutesSession;