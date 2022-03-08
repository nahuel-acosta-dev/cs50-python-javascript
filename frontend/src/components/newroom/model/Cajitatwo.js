import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function Cajitatwo({data,sendMsj, setmsj}){
const [response, setResponse] = useState(false);

    const aceptar = (e) => {
        setResponse(true);
        sendMsj(e, 'response', true);
    }

    const rechazar = (e) => {
        setResponse(true);
        sendMsj(e, 'response', false);
    }

    return(
        <>{
            data.model !== 'response' ?
                (<td>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{data.name} Te Invito a compartir tus ideas</Card.Title>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{data.theme}</Card.Subtitle>
                            <Card.Text>
                            {data.description}
                            </Card.Text>
                            {!response ?
                            <>
                            <Button variant="primary" onClick={e =>{aceptar(e)}}>Aceptar</Button>
                            <Button variant="primary" onClick={e =>{rechazar(e)}}>Rechazar</Button>
                            </>: <span>Gracias por Responder</span>}
                        </Card.Body>
                    </Card>
                </td>):
                (<td>
                    <p className="bg-success p-2 mt-2 mr-5 
                    shadow-sm text-white float-right rounded">Ha {
                    data.msg == true ?
                    'Aceptado la propuesta':
                    'Rechazado la propuesta'}</p>
                </td>)
            }
        </>
    )
}
