import React, {useContext} from 'react';
import Register from './../session/Register';
import Login from './../session/Login';
import Header from '../header/Header';
import Home from './../home/Home';
import AuthContext from "../../contexts/AuthContext";
import Room from '../room/Room';
import NewRoom from '../newroom/NewRoom';
import SelectGroup from '../invitation/SelectGroup';
import GetItems from '../reinvitations/GetItems';


import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Navigate} from "react-router-dom";

const RoutesSession = () => {

    let {user} = useContext(AuthContext);

    return (
        
        <Router>
            <Header />
                <Routes>
                    <Route exact path="/*" element={!user ?<Navigate to="/login"/> : <Home />} />
                    <Route exact path="/register" element={!user ?<Register/> : <Navigate to="/"/>} />
                    <Route exact path="/login" element={user ? <Navigate to="/"/> : <Login />}/>
                    <Route exact path="/invitation/*" element={!user ? <Navigate to="/login"/> : <SelectGroup/>} />
                    <Route exact path="/receive-invitations/*" element={!user ? <Navigate to="/login"/> : <GetItems/>} />
                    <Route exact path="/private_room/room" element={!user ? <Navigate to="/login"/> : <Room />} />
                    <Route exact path="/room/*" element={!user ? <Navigate to="/login"/> : <Room />} />
                    <Route exact path="/newroom/*" element={!user ? <Navigate to="/login"/> : <NewRoom />} />
                </Routes>
        </Router>
    )

}

export default RoutesSession;