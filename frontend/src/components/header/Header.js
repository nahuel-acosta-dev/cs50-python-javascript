import React, {useContext} from 'react';
import { AuthProvider } from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';

import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link} from "react-router-dom";

const Header = ({user,logoutUser}) => {
    
    return (
    <>
    <nav>{!user ? 
        (<><Link to="login">Login</Link> | </>) : 
        (<><Button variant="link" onClick={logoutUser}>Logout</Button> | </>)}
        <Link to="register">Register</Link>
    </nav>
    </>
    
    )
}

export default Header;