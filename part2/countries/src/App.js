import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setCountriesFilter(e.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(countriesFilter.toLowerCase())
  );

  let userFeedback = null;
  const countriesToShowLength = countriesToShow.length;
  if (countriesToShowLength > 10) {
    userFeedback = <p>Too many matches, specify another filter</p>;
  } else if (countriesToShowLength > 1 && countriesToShowLength <= 10) {
    userFeedback = countriesToShow.map((country) => (
      <li key={country.name}>{country.name}</li>
    ));
  } else {
    userFeedback = "only one";
  }

  return (
    <>
      find countries
      <input value={countriesFilter} onChange={handleChange} />
      {userFeedback}
    </>
  );
};

export default App;
