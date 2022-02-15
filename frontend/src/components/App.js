import React, {useState, useEffect} from "react";
import RoutesSession from "./routes/RoutesSession";
import jwt_decode from "jwt-decode";


const App = () => {
  const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? 
  jwt_decode(localStorage.getItem("authTokens")) : null);
  const [authTokens, setAuthToken] = useState(() => localStorage.getItem("authTokens") ? 
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
    let response = await fetch('http://127.0.0.1:8000/capstone_api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'refresh':authTokens.refresh})
    })
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    else logoutUser()
  }


  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }

  let contexData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if(authTokens){
        updateToken(authTokens);
      }
    }, fourMinutes)
    //revisar esta parte, mi sesion se cierra tras cumplir el tiempo que marc
    //four minutes debido a que se actualiza el token
    return () => clearInterval(interval);
  }, [authTokens, loading])

  return(
    <div>
        <RoutesSession user={user} setUser={setUser}  
        loginUser={loginUser} logoutUser={logoutUser}/>
    </div>)
}

export default App;
