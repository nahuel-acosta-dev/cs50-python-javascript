import React, {useContext} from 'react';
import AuthContext  from "../../contexts/AuthContext";
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
            (<section className="row">
                <div className="col-md-2"><Link to="/">Home</Link></div>
                <div className="col-md-2"><Link to="/invitation">Invitation</Link></div>
                <div className="col-md-2"><Link to="/receive-invitations">receive invitations</Link></div>
                <div className="col-md-2"><Button variant="link" onClick={logoutUser}>Logout</Button></div>
            </section>)}
        </nav>
    </>
    
    )
}

export default Header;