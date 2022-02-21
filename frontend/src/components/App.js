import React from "react";
import RoutesSession from "./routes/RoutesSession";
import {AuthProvider} from "./contexts/AuthContext";


const App = () => {

  return(
    <AuthProvider>
        <RoutesSession />
    </AuthProvider>)
}

export default App;
