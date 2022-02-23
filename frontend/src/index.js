import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "./components/App";
import { w3cwebsocket as W3CWebSocket  } from "websocket";




ReactDOM.render(
      <App />,
    document.getElementById('app')
  );