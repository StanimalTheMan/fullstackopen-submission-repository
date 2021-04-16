import React, { useEffect, useState } from "react";
import personService from "./services/persons";

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

const Persons = ({ deletePerson, filteredNumbers }) => {
  return filteredNumbers.map((person, i) => (
    // temporary key
    <Person
      deletePerson={() => deletePerson(person.id)}
      key={i}
      name={person.name}
      number={person.number}
    />
  ));
};

const Person = ({ deletePerson, name, number }) => {
  return (
    <p>
      {name} {number} <button onClick={deletePerson}>delete</button>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`))
      personService.deletePerson(id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const addNumber = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (!person) {
      // create
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // setNewName("");
        // setNewNumber("");
      });
    } else {
      // update potentially
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `the person '${person.name}' was already deleted from server`
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
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

      <Persons deletePerson={deletePerson} filteredNumbers={filteredNumbers} />
    </div>
  );
};

export default App;
