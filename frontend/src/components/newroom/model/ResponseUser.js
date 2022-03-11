import React from 'react';
import Card from 'react-bootstrap/Card';


const ResponseUser = ({data}) => {
    console.log(data)
    return(
        <>{data.model !== 'response' ?
        <td>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{data.name} Te Invito a compartir tus ideas</Card.Title>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{data.theme}</Card.Subtitle>
                    <Card.Text>
                    {data.description}
                    </Card.Text>
                    <span>Gracias por Responder</span>
                </Card.Body>
            </Card>
        </td>:
        <td>
        <p className="bg-success p-2 mt-2 mr-5 
            shadow-sm text-white float-right rounded">Ha {
            data.response == 'True' ?
            'Aceptado la propuesta':
            'Rechazado la propuesta'}
        </p>
        </td>
        }
    </>
    )

}

export default ResponseUser;