import React from "react";

const View = (props) =>{
    let clickedCountry = props.clickedCountry;
    let country = props.country;
    console.log("props is ", props);
    return (
        <>
        {
           country.name === clickedCountry ?
               <>
               <h1>{country.name}</h1>
               <p>Capital {country.capital}</p>
               <p>Population {country.population}</p>
               <h2>Languages</h2>
               <ul>
                   {
                       country.languages.map((language) => {
                          return <p>{language.name}</p>
                       })
                   }
               </ul>
               <h2>Flags</h2>
               <img src={country.flag} />
               </>
               :<></>
        }
        
        </>
    )
}

export default View;