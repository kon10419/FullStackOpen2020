import React,{useState, useEffect}from 'react';
import axios from "axios"
import Search from "./components/Search"
import Country from "./components/Country"
import './App.css';



const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [found, setFound] = useState(0);
  useEffect(() => {
    axios 
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
        console.log("data is ",response.data);
      })
  },[])


  const foundMatch = () =>{
    setFound(found + 1);
  }
  const handleSearch = (event) =>{
    setSearch(event.target.value);
  }
  const searchCountries = () => {
    let foundCountries = countries.map((country) => {
      let name = country.name.toLowerCase();
      if(name.search(search.toLowerCase) !== -1){
        foundMatch()
        foundCountries.concat(country);
      } 
    })
  }
  return (<div>
  <Search handleSearch={handleSearch} search={search} />
  
  {
    foundMatch <= 10 ? 
    countries.map((country) => {
     return <Country country={country} search={search} found={found} foundMatch={foundMatch} />
    }) : <p>Too many matches, specify another new filter</p>
    
    }
  
  </div> )

}


export default App;
