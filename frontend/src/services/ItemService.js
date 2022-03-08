import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/capstone_api';

const getItem = (item, authTokens) => axios
.get(`${baseUrl}/${item}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    });


const createItem = (element,newObject,authTokens) => 
fetch(`${baseUrl}/${element}`,{
    method: 'POST',
    body: JSON.stringify(newObject),
    headers: {
    'Content-Type': 'application/json',
    "Accept": "*/*",
    'Authorization': 'Bearer ' + String(authTokens.access)    
}
});


const updateItem = (element, newObject, authTokens) => 
fetch(`${baseUrl}/${element}`, {
    method: 'PUT',
    body: JSON.stringify(newObject),
    headers: {
    'Content-Type': 'application/json',
    "Accept": "*/*",
    'Authorization': 'Bearer ' + String(authTokens.access)
}
});


const deleteItem = (element) => axios
.delete(`${baseUrl}/${element}`,{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
    }
});


export default { 
    getItem:getItem,
    createItem:createItem,
    updateItem:updateItem,
    deleteItem:deleteItem
  }