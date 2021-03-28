import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return <input value={nameFilter} onChange={handleNameFilterChange} />;
};

const PersonForm = ({
  addNumber,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredNumbers }) => {
  return filteredNumbers.map((person, i) => (
    // temporary key
    <Person key={i} name={person.name} number={person.number} />
  ));
};

const Person = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  });

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const addNumber = (event) => {
    event.preventDefault();
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat({ name: newName, number: newNumber }));
      }
    }
  };

  const filteredNumbers = nameFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filteredNumbers={filteredNumbers} />
    </div>
  );
};

export default App;
