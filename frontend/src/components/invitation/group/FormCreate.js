import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 

const FormCreate = ({createDetails}) => {

    return(
        <Form onSubmit={e => createDetails(e)} >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Insert Title" name="title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Theme</Form.Label>
                    <Form.Control type="text" placeholder="Insert Theme" name="theme" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Insert Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
    )

}

export default FormCreate;