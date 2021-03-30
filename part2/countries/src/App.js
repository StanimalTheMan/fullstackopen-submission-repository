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

  return (
    <>
      find countries
      <input />
    </>
  );
};

export default App;
