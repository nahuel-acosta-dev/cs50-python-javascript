import React, {useContext} from 'react';
import Register from './../session/Register';
import PreHome from '../home/PreHome';
import Login from './../session/Login';
import Header from '../header/Header';
import Home from './../home/Home';
import AuthContext from "../../contexts/AuthContext";
import Room from '../private-room/Room';
import SelectGroup from '../invitation/SelectGroup';
import GetItems from '../reinvitations/GetItems';


import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Navigate} from "react-router-dom";

const RoutesSession = () => {
    let redirect = "/quickideas";
    let {user} = useContext(AuthContext);

    return (
        
        <Router>
            <Header />
                <Routes>
                    <Route exact path="/quickideas" element={<PreHome />} />
                    <Route exact path="/*" element={!user ?<Navigate to={redirect}/> : <Home />} />
                    <Route exact path="/register" element={!user ?<Register/> : <Navigate to="/"/>} />
                    <Route exact path="/login" element={user ? <Navigate to="/"/> : <Login />}/>
                    <Route exact path="/invitation/*" element={!user ? <Navigate to={redirect}/> : <SelectGroup/>} />
                    <Route exact path="/receive-invitations/*" element={!user ? <Navigate to={redirect}/> : <GetItems/>} />
                    <Route exact path="/private_room/:room/:myuser/:id" element={!user ? <Navigate to={redirect}/> : <Room />} />
                    <Route exact path="/room/*" element={!user ? <Navigate to={redirect}/> : <Room />} />
                </Routes>
        </Router>
    )

}

export default RoutesSession;