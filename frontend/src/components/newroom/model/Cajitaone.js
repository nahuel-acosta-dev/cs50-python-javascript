import React from 'react';
import Card from 'react-bootstrap/Card';

export default function Cajitaone({data}){

    return(<>{
            data.model !== 'response' ?
                (<td>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{data.theme}</Card.Subtitle>
                            <Card.Text>
                            {data.description}
                            </Card.Text>
                            <footer className="blockquote-footer">
                               Le has enviado tu propuesta   
                                <cite title="Source Title"> {data.title}</cite>
                            </footer>
                        </Card.Body>
                    </Card>
                </td>):
                (<td>
                    <p className="bg-success p-2 mt-2 mr-5 
                    shadow-sm text-white float-right rounded">Has {
                        
                    data.response == true ?
                    'Aceptado la propuesta':
                    'Rechazado la propuesta'}</p>
                    {/*se necesita poner "True" pero eso afectara la respuesta asincronica,
                    mejor crear otro modelo*/ }
                </td>)
                
            }
        </>)
}
