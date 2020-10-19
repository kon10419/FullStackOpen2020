import React from "react"

const Country = (props) => {
    let country = props.country;
    let languages = []
    let search = props.search;
    let countryName= props.country.name.toLowerCase();
    let found = props.found;
    let foundMatch= props.foundMatch;

    country.languages.map((language) => {
        languages.push(language.name);
    });
    
    if(countryName.search(search.toLowerCase !== -1)){
        if(found === 0 ){
            foundMatch();
            return(<>
                <h1>{country.name}</h1>
                <p>{country.capital}</p>
                <h2>languages</h2>
                <ul>
                {languages.map((language) => {
                    foundMatch();
                    return <li>
                        {language}
                    </li>
                })}
                </ul>
                <img src= {country.flag}/>
        
                </>)    
               } else if(found <= 10 ){
                foundMatch();
                 return <p>{country.name}</p>
        } else{
            return <p>Too many matches, specify another filter</p>
        }

    }else{
        return<p>No matches found</p>
    }
}

export default Country;