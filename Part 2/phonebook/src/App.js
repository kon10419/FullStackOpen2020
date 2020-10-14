import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', key: "Arto Hellas" }
  ]) 
  const [newNumber, setNewNumber] = useState("")
  const [ newName, setNewName ] = useState('')

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
      <form onSubmit={addPerson}> 
        <div>
          name: <input onChange={handleName} value={newName}/>
          </div>
          <div>
          phone: <input onChange={handleNumber} valu={newNumber} />
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App