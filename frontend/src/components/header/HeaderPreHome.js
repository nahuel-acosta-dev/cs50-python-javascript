import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';


const HeaderPreHome = () => {


    return (
            <Navbar.Collapse className="justify-content-md-end">
                <Navbar.Text>
                            <Row>
                                <Col md className="nav-links"><Link to="/login">Login</Link></Col>
                                <Col md className="nav-links"><Link to="/register">Register</Link></Col>
                            </Row>
                </Navbar.Text>
            </Navbar.Collapse>
    )
}

export default HeaderPreHome;