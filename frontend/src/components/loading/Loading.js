import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';

const Loading = () => {


    return (
        <Row className="loading align-items-center justify-content-center">
            <Spinner id="spiner2" className="spiner" animation="grow" />
        </Row>
    )

}
    



export default Loading;