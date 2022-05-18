import React,{useState, memo} from 'react';
import Button from 'react-bootstrap/Button';

const Buttons = ({enviar, setResponse, data}) => {
    const [touchButton, setTouchButton] = useState(false);

    const agree = (e) => {
        setTouchButton(true);
        enviar(e, true);
        setResponse(true);
    }

    const reject = (e) => {
        setTouchButton(true);
        enviar(e, false);
    }

    return(
        <>{!touchButton ?
            (<>
            <div>
                <p><strong>Title:</strong> {data.title}</p>
                <p><strong>Theme:</strong> {data.theme}</p>
            </div>
            <div>
                <p><strong>Description:</strong> {data.description}</p>
            </div>
            <div className="row">
                <Button variant="primary" className="col button1" 
                    size="sm" onClick={(e) => agree(e)}>Aceptar</Button>
                <Button variant="danger" className="col" size="sm" 
                    onClick={(e) => reject(e)}>Rechazar</Button>
            </div></>)
            :
            (<p>Thanks for answering</p>)
            }
        </>
    )
}

export default memo(Buttons);