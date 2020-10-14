import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', key: "Arto Hellas" }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value);
  }
  const addPerson = (event) => {
    const newPerson = {name: newName, key: newName}
    event.preventDefault();
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} has already been added`);
      setNewName("")
    }
    setPersons(persons.concat(newPerson));
    setNewName("");
    console.log(persons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input onChange={handleChange} value={newName}/>
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