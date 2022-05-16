import React from 'react';
import Row from 'react-bootstrap/Row';

//const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/kakao/`);

const Home = () => {

    return (
    <section className="home">
      <h2 className="title-home">How does Quick Ideas work?</h2>
      <Row className="cont-articles">
        <article className="art art1 row align-content-center">
          <h4>Create</h4>
          <p>
            Create a template with the requirements for your Ideas group
            And invite the people you think are most suitable to be part of it.
          </p>
          </article>   
        <article className="art art2 row align-content-center">
          <h4>Get into</h4>
          <p>
            Receive invitations from people to belong to their group of ideas, and accept
            the requests that you like the most.
          </p>
        </article>  
        <article className="art art3 row align-content-center">
          <h4>To play</h4>
          <p>
            Once you enter the room with your groupmates, open your mind and contribute all the ideas
            get out of your head.
          </p>
        </article>  
      </Row>
    </section>
    
    )
}

export default Home;