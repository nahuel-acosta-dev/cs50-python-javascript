import React, {useEffect, useState, useContext} from 'react';
import ItemService from '../../services/ItemService';
import Header from './../header/Header';
import AuthContext from "../contexts/AuthContext";

const Home = () => {
    const [coins, setCoins] = useState([]);
    let {loading, logoutUser, authTokens, updateToken} = useContext(AuthContext);

    let state = {
        isLoggedIn: false,
        messages: [],
        value: '',
        name: '',
        room: '',
    }

    let getCoins = async () =>{
        let response = await ItemService.getItem("coins", authTokens);

        if(response.status === 200){
            setCoins(response.data);
        }else if(response.statusText === 'Unauthorized'){
            logoutUser();
        }
        
    }

    useEffect(() =>{

        if(loading){
            updateToken();
        }
        getCoins();
    }, []);

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