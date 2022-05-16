import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const PreHome = () => {


    return (
        <section className="pre-home row">
            <div className="cont-text col">
                <h1>Welcome to Quick Ideas</h1>
                <p>
                    Un texto es una composición de signos codificados en un sistema de escritura que forma 
                    una unidad de sentido. 
                    También es una composición de caracteres imprimibles generados por un algoritmo de 
                    cifrado que, aunque no tienen sentido para cualquier persona, sí puede ser 
                    descifrado por su destinatario original.
                </p>
                <Link className="btn btn-primary" to="/register">Register. It's free!</Link>
            </div>
            <div className="cont-img col">
                <img src="../../../static/images/kite-152756.svg"/>
            </div>
        </section>
    )

}

export default PreHome;