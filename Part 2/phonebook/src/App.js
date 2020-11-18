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
    let id = 0;
    event.preventDefault();
    if(persons.find(person => person.name === newName)) {
      if(persons.find(person => person.number === newNumber)){

      alert(`${newName} has already been added`);
      setNewName("")
      setNewNumber("");
      }else{
        const updateNumber = window.confirm(`Update phone number for ${newName}?`);
        if(updateNumber === true){
        persons.find(person => person.name === newName ? id = person.id : null);
        let newList = persons.filter(person => person.name !== newName);
        newPerson.id = id;
        newList.push(newPerson);
        personService.update(id,newPerson)
        setPersons(newList);
        setNewName("");
        setNewNumber("");
      }
    }}else{
    personService.add(newPerson);
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
    console.log(persons);
  }
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