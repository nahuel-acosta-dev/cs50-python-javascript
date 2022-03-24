import React,{useState, memo} from 'react';
import Button from 'react-bootstrap/Button';

const Buttons = ({enviar, setResponse}) => {
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
            (<div className="row">
                <Button variant="primary" className="col button1" 
                    size="sm" onClick={(e) => agree(e)}>Aceptar</Button>
                <Button variant="danger" className="col" size="sm" 
                    onClick={(e) => reject(e)}>Rechazar</Button>
            </div>)
            :
            (<p>Gracias por responder</p>)
            }
        </>
    )
}

export default memo(Buttons);