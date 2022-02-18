import React, {useEffect, useState, useContext} from 'react';
import Header from './../header/Header';
import AuthContext from "../contexts/AuthContext";

const Home = () => {
    const [coins, setCoins] = useState([]);
    let {loading, logoutUser, authTokens, updateToken} = useContext(AuthContext);

    useEffect(() =>{

        if(loading){
            updateToken();
        }
        getCoins();
    }, []);

    let getCoins = async () =>{
        let response = await fetch('http://localhost:8000/capstone_api/coins',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json();

        if(response.status === 200){
            setCoins(data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }
        
        console.log(data)
    }


    return (
    <>
    <h1>Este es el home</h1>
        <Header/>
        {coins.map(coin => (
            <div key={coin.id}>funciona{coin.coins}</div>
        ))

        }
    </>
    
    )
}

export default Home;