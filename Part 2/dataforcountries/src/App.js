import React,{useState, useEffect}from 'react';
import axios from "axios"
import Search from "./components/Search"
import Country from "./components/Country"
import View from "./components/View"
import './App.css';



const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [tooMany, setTooMany] = useState(false); 
  const [clicked, setClicked] = useState(false);
  const [clickedCountry, setClickedCountry] = useState("");
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
    setClicked(false);
    let found = countries.filter(country => checkCountry(country));
  }
  
  const changeTooMany = (x) => {
    setTooMany(x)
  }

  const handleClick = (event) => {
         setClicked(!clicked);
         setClickedCountry(event.target.name);
     console.log("clickedCountry is ",clickedCountry)
  }

  countries.map((country) => {
    let check = country.name.toLowerCase();
    let newSearch = search.toLowerCase();
    let clicked = false;
    country.clicked = clicked;
   return  check.search(newSearch) != -1 && found <=10 ? 
    foundCountries.push(country)
    : <></>
  })  

  return (<div>
  <Search handleSearch={handleSearch} search={search} changeTooMany={changeTooMany} />
  
    {
      clicked === false?
      foundCountries.length <= 10?
      foundCountries.map((country) => {
      return <Country country={country} foundCountries={foundCountries} handleClick={handleClick} />
      }) 
      : <p>Too many matches, specify a new filter</p>
      : foundCountries.map((country) => {
        return <View clickedCountry={clickedCountry} country={country}/>

      })
    }
  </div> )
}


export default App;
