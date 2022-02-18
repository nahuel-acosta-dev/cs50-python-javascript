import axios from 'axios';
const baseUrlToken = 'http://127.0.0.1:8000/capstone_api/token/';

let loginUser = async (e) => {
    e.preventDefault();
    console.log("formulario enviado");
    console.log(e.target.password.value);
    let response = await fetch('baseUrlToken', {
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
    let response = await fetch('baseUrlToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'refresh':authTokens?.refresh})
    })
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    else logoutUser();

    if(loading) {
      setLoading(false);
    }
  }


  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }


export default { 
    loginUser: loginUser, 
    updateToken: updateToken ,
    logoutUser: logoutUser
  }