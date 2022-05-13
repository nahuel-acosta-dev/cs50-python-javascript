import React from 'react';
import Row from 'react-bootstrap/Row';

//const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/kakao/`);

const Home = () => {

    return (
    <section className="home">
      <h2>Este es el home</h2>
      <Row>
        <article className="art art1">
          </article>   
        <article className="art art2">
          </article>  
        <article className="art art3">
          </article>  
      </Row>
    </section>
    
    )
}

export default Home;