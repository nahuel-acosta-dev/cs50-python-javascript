import axios from 'axios';
const baseUrl = 'capstone_api';

const register = newObject => {
    return axios.post(`${baseUrl}/register`, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/update/${id}`, newObject)
}

const deleteUser = (id) => {
    return axios
    .delete(`${baseUrl}/delete/${id}`)
}

export default { 
    register: register, 
    update: update ,
    deleteUser: deleteUser
  }