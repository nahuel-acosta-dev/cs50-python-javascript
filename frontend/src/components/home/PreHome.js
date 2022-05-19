import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const PreHome = () => {


    return (
        <section className="pre-home row">
            <div className="cont-text col">
                <h1>Welcome to Quick Ideas</h1>
                <p>
                Welcome to Quick ideas, here you can interact with other people 
                through ideas, that is, you will be able to invite, receive 
                invitations and play with other people who will help you with 
                their ideas so that you can achieve what you want.
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