import React, {useState, useContext} from 'react';
import AuthContext from "../contexts/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Register = () => {
    const [datos, setDatos] = useState({username: '', 
    email: '', 
    password: '', 
    confirmation: ''});
    let {loginUser} = useContext(AuthContext);


    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
        
    }
     
    let bodyContent = new FormData();
    bodyContent.append("username", datos.username);
    bodyContent.append("email", datos.email);
    bodyContent.append("password", datos.password);
    bodyContent.append("confirmation", datos.confirmation);

    let registerUser = async (e) => {
        e.preventDefault();
        console.log('username:' + datos.username + " password: " + datos.password);
        let response = await fetch("http://localhost:8000/capstone_api/register", { 
          method: "POST",
          body: bodyContent,
          headers: {
            "Accept": "*/*"
          }
        });

        let data = await response.json();
        console.log(data);
        loginUser(e);
    }   

    return (
      <>
        <Form onSubmit={registerUser} method='post'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" 
          name="username" onChange={handleInputChange}/>
          <Form.Text className="text-muted">
            We'll never share your Username with anyone else.
          </Form.Text>
        </Form.Group>   

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  
          name="email" onChange={handleInputChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
          name="password" onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmation">
          <Form.Label>Confirmation Password</Form.Label>
          <Form.Control type="password" placeholder="Confirmation Password" 
          name="confirmation" onChange={handleInputChange} />
          <Form.Text className="text-muted">
            We'll never share your Confirmation with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <Link to="/login">Login</Link>
      </div>
      </>
    )

}

export default Register;