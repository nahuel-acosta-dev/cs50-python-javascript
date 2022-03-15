import React, {createContext, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  let [user, setUser] = useState(() => localStorage.getItem("authTokens") ? 
  jwt_decode(localStorage.getItem("authTokens")) : null);
  let [authTokens, setAuthToken] = useState(() => localStorage.getItem("authTokens") ? 
  JSON.parse(localStorage.getItem("authTokens")) : null);
  let [loading, setLoading] = useState(true);

  let loginUser = async (e) => {
    e.preventDefault();
    console.log("formulario enviado");
    console.log(e.target.password.value);
    let response = await fetch('http://127.0.0.1:8000/capstone_api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': e.target.username.value, 
      'password': e.target.password.value})
    })
    let data = await response.json();
    console.log('data:', data);
    console.log('response:', response);
    if(response.status === 200){
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    else alert('Something went weong!');
}

  let updateToken = async () => {
    console.log('update Token called');
    let response = await fetch('http://127.0.0.1:8000/capstone_api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'refresh':authTokens?.refresh})
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    else logoutUser();

    if(loading) setLoading(false);
    
  }


  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }

  let contextData = {
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    user: user,
    authTokens: authTokens
  }

  useEffect(()=> {

    if(loading)updateToken();
    
    let fourMinutes = 1000 * 60 * 4

    let interval =  setInterval(()=> {
        if(authTokens)updateToken();
        
    }, fourMinutes);

    return ()=> clearInterval(interval);

}, [authTokens, loading]);


  return(
      <AuthContext.Provider value={contextData}>
          {loading ? null : children}
    </AuthContext.Provider>  
  )
}
