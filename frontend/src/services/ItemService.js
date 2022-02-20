import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/capstone_api';

const getItem = (item, authTokens) => axios
.get(`${baseUrl}/${item}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    });


const createItem = async (element,newObject) => await axios
.post(`${baseUrl}/create/${element}`, newObject);


const updateItem = async (id,element, newObject) => await axios
.put(`${baseUrl}/update/${element}/${id}`, newObject);


const deleteItem = async (element, id) => await axios
.delete(`${baseUrl}/delete/${element}/${id}`);


export default { 
    getItem:getItem,
    createItem:createItem,
    updateItem:updateItem,
    deleteItem:deleteItem
  }