import React from "react";
import RoutesSession from "./routes/RoutesSession";
import {AuthProvider} from "../contexts/AuthContext";
import {ItemProvider} from "../contexts/ItemContext";


const App = () => {

  return(
    <AuthProvider>
      <ItemProvider>
          <RoutesSession />
      </ItemProvider>
    </AuthProvider>)
}

export default App;
