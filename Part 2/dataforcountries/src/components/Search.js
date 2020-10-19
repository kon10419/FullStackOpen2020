import React from "react"

const Search = (props) => {
    
    return <>
        <p>Find countries <input onChange={props.handleSearch} value={props.search} /></p>
    </>
}

export default Search;