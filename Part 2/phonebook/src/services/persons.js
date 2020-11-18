import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll= () => {
    return axios.get(baseURL);
}

const add = (newPerson) =>{
    console.log("newPerson is ", newPerson);
    return axios.post(baseURL, newPerson);
}

const update = (id,newPerson) => {
    return axios.put(`${baseURL}/${id}`,newPerson);
}

const deletePerson = (person) => {
    return axios.delete(`${baseURL}/${person.id}`);
}

export default {getAll,add,update,deletePerson};