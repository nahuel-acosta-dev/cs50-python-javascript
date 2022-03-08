import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () =>{
    let {loginUser} = useContext(AuthContext);

    return (
    <>
        <Form onSubmit={loginUser} method='post'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username address</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" name="username"/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        <div>
            <Link to="/register">Register</Link>
        </div>
        
        </>
        )
}

export default Login;