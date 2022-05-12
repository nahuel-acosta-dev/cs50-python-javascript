import React, {createContext, useContext} from 'react';
import ItemService from '../services/ItemService';
import AuthContext from '../contexts/AuthContext';
const ItemContext = createContext();

export default ItemContext;

export const ItemProvider = ({children}) => {
    let {authTokens, logoutUser} = useContext(AuthContext);

    const getItemContext = async (url, set) => {
        let response = await ItemService.getItem(url, authTokens);
            if(response.status === 200){
                set(response.data);
                console.log('response.data:');
                console.log(response.data);
            }
            else if(response.statusText === 'Unauthorized')logoutUser();
    }

    const updateItemContext = async (url, object) => {
        let response = await ItemService.updateItem(url, object, authTokens);

        if(response.status === 200){
            console.log(response.data);
        }
        else if(response.statusText === 'Unauthorized')logoutUser();
    }
 
    let contextData = {
        getItemContext: getItemContext,
        updateItemContext: updateItemContext
    }

    return(
        <ItemContext.Provider value={contextData}>
          {children}
        </ItemContext.Provider>  
    )

}