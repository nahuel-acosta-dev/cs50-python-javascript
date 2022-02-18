import React, {useContext} from 'react';
import Register from './../session/Register';
import Login from './../session/Login';
import Home from './../home/Home';
import AuthContext from "../contexts/AuthContext";


import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link, 
    Navigate} from "react-router-dom";

const RoutesSession = () => {

    let {user, setUser, loginUser} = useContext(AuthContext);

    return (
    <Router>
            <Routes>
                <Route exact path="/" element={!user ?<Navigate to="/login"/> : <Home />} />
                <Route exact path="/register" element={<Register setUser={setUser}/>}/>
                <Route exact path="/login" element={user ? <Navigate to="/"/> : <Login />}/>
            </Routes>
    </Router>)

}

export default RoutesSession;