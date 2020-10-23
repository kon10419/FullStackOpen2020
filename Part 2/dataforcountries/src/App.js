import React,{useState, useEffect}from 'react';
import axios from "axios"
import Search from "./components/Search"
import Country from "./components/Country"
import './App.css';



const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [tooMany, setTooMany] = useState(false); 
  let foundCountries = [];
  let found = 0;
  let newArray =[];
  
  useEffect(() => {
    axios 
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
        console.log("data is ",response.data);
      })
  },[])

  const checkCountry = (x) =>{
    let check = x.name.toLowerCase();
    if(check.search(search.toLowerCase()) != -1){
      return x
    }
  }
  const handleSearch = (event) =>{
    setSearch(event.target.value);
    let found = countries.filter(country => checkCountry(country));
    console.log("foundCountries is ", found);
    console.log(search);
  }
  const changeTooMany = (x) => {
    setTooMany(x)
  }

  countries.map((country) => {
    let check = country.name.toLowerCase();
    let newSearch = search.toLowerCase();
   return  check.search(newSearch) != -1 && found <=10 ?
    foundCountries.push(country)
    : <></>
  })  
  return (<div>
  <Search handleSearch={handleSearch} search={search} changeTooMany={changeTooMany} />
  
    {
      foundCountries.length <= 10?
      foundCountries.map((country) => {
      return <Country country={country} foundCountries={foundCountries} />
      })
      :<p>Too many matches, specify a new filter</p>
    }
  
  </div> )
}


export default App;
