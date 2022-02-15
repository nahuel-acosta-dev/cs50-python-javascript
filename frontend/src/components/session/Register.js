import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";


const Register = ({setUsuario}) => {
    const [datos, setDatos] = useState({username: '', 
    email: '', 
    password: '', 
    confirmation: ''});

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
        
    }

    const registerUser = (event) => {
        event.preventDefault();
        console.log('username:' + datos.username + " password: " + datos.password);
        fetch(`capstone_api/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: datos.username,
                email: datos.email,
                password: datos.password,
                confirmation: datos.confirmation
            })
        })
        .then(response => response.json())
        .then(result => {
          console.log(result);
        })
        
    }   

    return (
      <>
        <Form onSubmit={registerUser}>
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
      </>
    )

}

export default Register;