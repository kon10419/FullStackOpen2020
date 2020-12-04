import React, { useState, useEffect } from 'react'
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [ newName, setNewName ] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("")

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const resetInput = () => {
    setNewName("");
    setNewNumber("");
  }
  const resetMessage = () => {
    setTimeout(() =>{
      setMessage(null);
      setMessageType("");
    },5000)
  }
  
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
      resetInput();
      setMessage(`${newName} has already been added`);
      setMessageType("error");
      resetMessage();
      }else{
        const updateNumber = window.confirm(`Update phone number for ${newName}?`);
        if(updateNumber === true){
        persons.find(person => person.name === newName ? id = person.id : null);
        let newList = persons;
        newList.find(person => person.name === newName ? person.number = newNumber : null);
        newPerson.id = id;
        personService.update(id,newPerson)
        .then(() => {
          setPersons(newList);
        resetInput();
        setMessage(`Updated ${newName}`);
        setMessageType("success");
        resetMessage();
        })
        .catch(error => {
          setMessage(`${newName} has already been removed from server.`);
          setMessageType("error");
          personService.getAll()
          .then((response => {
            setPersons(response.data)
          }))
          .then(() => {
            resetMessage();
            resetInput();
          })
        })
      }
    }}else{
    personService.add(newPerson)
    .then(() => {
      personService.getAll()
      .then(response => {
        setPersons(response.data)
      }).then(() => {
        resetInput();
    setMessage(`Added ${newName}`);
    setMessageType("success");
    resetMessage();
      })
    })
    .catch(error => {
      setMessage(`${newName} has already been added`);
      setMessageType("error");
      resetMessage();
    })
  }
  }

  const handleDelete = (event) => {
    console.log(`Delete event is ${event.target.name}`);
    const name = event.target.name;
    const personToDelete = persons.find(person => person.name === name);
    console.log(`Person to delete is ${personToDelete.name}`);
    const shouldDelete = window.confirm(`delete ${name}?`);
    if(shouldDelete === true){
      personService.deletePerson(personToDelete)
      .then(() => {
      setPersons(persons.filter(person => person.name !== name));
      setMessage(`Deleted ${name}`);
      setMessageType("success");
      resetMessage();
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
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