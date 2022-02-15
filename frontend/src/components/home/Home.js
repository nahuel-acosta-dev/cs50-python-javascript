import React, {useContext} from 'react';
import Header from './../header/Header';
import { AuthProvider } from "./../context/AuthContext";

const Home = ({user, logoutUser}) => {
    return (
    <>
    <h1>Este es el home</h1>
        <Header logoutUser={logoutUser} user={user}/>
    </>
    
    )
}

export default Home;