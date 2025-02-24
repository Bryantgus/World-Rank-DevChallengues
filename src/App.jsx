import "./App.css"
import AllCountries from "./components/AllCountries"
import Country from "./components/Country"
import { useState, useEffect } from "react";
import Logo from "./assets/Logo.svg"

  const URL_API = "https://restcountries.com/v3.1/all";
  const ENDPOINT = "?fields=name,flags,population,area,region,independent,unMember,capital,subregion,languages,currencies,continents"
export default function App() {

  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");
  const [dataCountry, setDataCountry] = useState({})

  function chargeInfoCountry(country) {    
    setCountrySelected(country);    
  }

  //Obtener datos de la api
  useEffect(() => {
    fetch(URL_API + ENDPOINT)
      .then(Response => Response.json())
      .then(data => {
        setCountries(data);
      })
  }, []);

  useEffect(() => {    
    let CountryFilter = countries.filter((country) => country.name.common === countrySelected);
    setDataCountry(CountryFilter);
    
  },[countrySelected, countries])


  return (
    <div className="appContainer">
      <header>
        <div className="imgContainer">
          <img className="logo" src={Logo} alt="" />
        </div>
       
      </header>
    
      {countrySelected === "" ? (
      <AllCountries chargeInfoCountry={chargeInfoCountry} countries={countries} />
    ) : (
      dataCountry && Object.keys(dataCountry).length > 0 ? (
        <Country dataCountry={dataCountry} />
      ) : null
    )}

    </div>
  )
}