import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll= () => {
    return axios.get(baseURL);
}

const add = (name,key, number) =>{
    const newPerson = {name,key,number};
    console.log("newPerson is ", newPerson);
    return axios.post(baseURL, newPerson);
}

const update = () => {

}


export default {getAll,add};