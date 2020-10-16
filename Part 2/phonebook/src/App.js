import React, { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"


const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [ newName, setNewName ] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }
  const handleName = (event) => {
    setNewName(event.target.value);
  }
  const handleNumber = (event) =>{
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    const newPerson = {name: newName, key: newName, number: newNumber}
    event.preventDefault();
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} has already been added`);
      setNewName("")
      setNewNumber("");
    }
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
    console.log(persons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search}/>
      <PersonForm addPerson={addPerson} handleName={handleName} handleNumber={handleNumber}  newNumber= {newNumber}  newName={newName} />
      <h2>Numbers</h2>
      <ul>
      {persons.map((person) =>
        <Persons person={person} search={search}/>)}
      </ul>
    </div>
  )
}

export default App