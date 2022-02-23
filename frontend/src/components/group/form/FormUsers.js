import React from 'react';
import Form from 'react-bootstrap/Form';

const FormUsers = () => {
    return(
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name Group</Form.Label>
                <Form.Control type="text" placeholder="name group" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Theme Group</Form.Label>
                <Form.Control type="text" placeholder="theme group" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description Group</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="description group"/>
            </Form.Group>
        </Form>
    )
}

export default FormUsers;