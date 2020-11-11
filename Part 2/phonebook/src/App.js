import React, { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [ newName, setNewName ] = useState('')

  useEffect(() => {
    personService.getAll()
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
    if(persons.find(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} has already been added`);
      setNewName("")
      setNewNumber("");
    }
      else{
        personService.update(newPerson.id,newPerson)
      }
    
    personService.add(newPerson);
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
    console.log(persons);
  }

  const handleDelete = (event) => {
    const name = event.target.name;
    const personToDelete = persons.find(person => person.name === name);

    const shouldDelete = window.confirm(`delete ${name}?`);
    
    if(shouldDelete === true){
      personService.deletePerson(personToDelete);
      setPersons(persons.filter(person => person.name !== name));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search}/>
      <PersonForm addPerson={addPerson} handleName={handleName} handleNumber={handleNumber}  newNumber= {newNumber}  newName={newName} />
      <h2>Numbers</h2>
      <ul>
      {persons.map((person) =>
        <Persons person={person} search={search} handleDelete={handleDelete}/>)}
      </ul>
    </div>
  )
}

export default App