import React, {createContext, Component, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    return (
            <AuthContext.Provider value={{'name':'Dennis'}}>
                {children}
            </AuthContext.Provider>
    )
}

export default AuthProvider;
