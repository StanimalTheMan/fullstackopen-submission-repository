import React, { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";

const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <>
      filter shown with
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </>
  );
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

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className="notification">{notification}</div>;
};

const Error = ({ error }) => {
  if (error === null) {
    return null;
  }

  return <div className="error">{error}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState(null); // probably should just include error as a notification
  const [error, setError] = useState(null);

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
      personService
        .deletePerson(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {});
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
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification(`Added ${returnedPerson.name}`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
          console.log(error.response.data);
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
            setNotification(`Updated ${returnedPerson.name}`);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            // alert(
            //   `the person '${person.name}' was already deleted from server`
            // );
            setError(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
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

      {/* one or the other will render atm */}
      <Notification notification={notification} />
      <Error error={error} />

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
