import React, {useState} from "react"

const Country = ({country, foundCountries, handleClick}) => {
    const [clicked, setClicked] = useState(false);
    let languages = country.languages;
    if(foundCountries.length ===1){
        return (
            <>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {
                    languages.map((language) => {
                      return <li>{language.name}</li>
                    })
                }
            </ul>
            <h2>Flag</h2>
            <img src={country.flag} />
            </>
        )
    }else{
        return (<>
            {
                clicked === false? 
                <p>{country.name} <button name={country.name} onClick={handleClick}>Show</button></p>
                : <p>clicked</p>
            }  
         </>)

    }
       
}
export default Country;