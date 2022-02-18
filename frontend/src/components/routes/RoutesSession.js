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

const RoutesSession = (props) => {

    return (
    <Router>
            <Routes>
                <Route exact path="/" element={!props.user ?<Navigate to="/login"/> : 
                <Home user={props.user} logoutUser={props.logoutUser} 
                authTokens={props.authTokens} updateToken={props.updateToken}/>} />
                <Route exact path="/register" element={<Register setUser={props.setUser}/>}/>
                <Route exact path="/login" element={props.user ? <Navigate to="/"/> : <Login 
                loginUser={props.loginUser} user={props.user}/>}/>
            </Routes>
    </Router>)

}

export default RoutesSession;