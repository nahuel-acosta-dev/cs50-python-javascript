import React, {useContext} from 'react';
import AuthContext  from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Header = () => {
    let {user,logoutUser} = useContext(AuthContext);

    return (
    <>
    <nav>
        {!user ? 
        (<> 
            <Link to="login">Login</Link> | 
            <Link to="register">Register</Link>
        </>) : 
        (<><Button variant="link" onClick={logoutUser}>Logout</Button> </>)}
    </nav>
    </>
    
    )
}

export default Header;