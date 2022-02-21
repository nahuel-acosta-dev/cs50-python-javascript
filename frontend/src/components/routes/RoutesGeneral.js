import React, {useContext} from 'react';
import AuthContext from "../contexts/AuthContext";

import { 
    BrowserRouter as Router, 
    Routes, 
    Route,
    Navigate} from "react-router-dom";

const RoutesGeneral = () => {

    let {user} = useContext(AuthContext);

    return (
    <Router>
            <Routes>
            </Routes>
    </Router>)

}

export default RoutesGeneral;