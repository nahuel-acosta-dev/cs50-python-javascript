import React, {useContext} from 'react';
import AuthContext  from "../../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderPreHome from './HeaderPreHome';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    let {user,logoutUser} = useContext(AuthContext);
    let location = useLocation();
    let hdrClass = false;
    if(location.pathname == '/login' || location.pathname == '/register'){
        hdrClass= true;
    }

    return (
    <header className={hdrClass ? 'header-none':'none'}>
        <Navbar bg="dark" variant="dark" className="row nav-bar" expand="md" >
            <Container className="container-preHome">
                <Navbar.Toggle />
                <Navbar.Brand>
                        <img
                        alt=""
                        src="../../../static/images/logo1.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Quick Ideas
                </Navbar.Brand>
            {user ?
            (
                <Navbar.Collapse className="">
                    <Navbar.Text className="my-navbar-text">
                        <Row>
                                <Col md className="my-nav-links nav-links"><Link to="/">Home</Link></Col>
                                <Col md className="my-nav-links nav-links"><Link to="/invitation">Invitate</Link></Col>
                                <Col md className="my-nav-links nav-links"><Link to="/receive-invitations">Invitations</Link></Col>
                                <Col md className="my-nav-links nav-links"><Button className="my-btn-link" variant="link" onClick={logoutUser}>Logout</Button></Col>
                        </Row>
                    </Navbar.Text>
                </Navbar.Collapse>
            ):
            (<HeaderPreHome />)
        }
            </Container>
        </Navbar>
    </header>
    
    )
}

export default Header;