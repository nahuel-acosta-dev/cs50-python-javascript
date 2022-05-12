import React from 'react';

const BackgroundSession = ({children}) => {
    return (
        <section className="cont-session">
        <div className="title-session">
          <img alt="logo.jpg" src="../../../static/images/logo1.png" width="40"
          className="d-inline-block align-top"/>{' '}
          <h2>Quick Ideas</h2>
        </div>
        <div className="frame-session">
            {children}
        </div>
      </section>
    )
}

export default BackgroundSession;