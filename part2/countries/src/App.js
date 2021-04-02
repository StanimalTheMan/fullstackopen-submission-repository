import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState("");
  const [countrySelected, setCountrySelected] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setCountriesFilter(e.target.value);
    setCountrySelected("");
  };

  const showCountryDetails = (country) => {
    setCountrySelected(country);
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
      <li key={country.name}>
        {country.name}{" "}
        <button onClick={() => showCountryDetails(country)}>show</button>
      </li>
    ));
    if (countrySelected) {
      userFeedback = (
        <div>
          <h1>{countrySelected.name}</h1>
          <p>capital {countrySelected.capital}</p>
          <p>population {countrySelected.population}</p>
          <h2>languages</h2>
          <ul>
            {countrySelected.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            src={countrySelected.flag}
            alt={countrySelected.name}
            width={50}
            height={50}
          />
        </div>
      );
    }
  } else if (countriesToShowLength === 1) {
    let country = countriesToShow[0];
    userFeedback = (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name} width={50} height={50} />
      </div>
    );
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
