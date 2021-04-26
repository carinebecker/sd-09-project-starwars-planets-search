import React, { useState, useEffect } from 'react';
import FetchContext from './FetchContext';

// eslint-disable-next-line react/prop-types
function FetchProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function deleteResidents(parr) {
    const newData = parr.map((currentValue) => {
      delete currentValue.residents;
      return currentValue;
    });
    return newData;
  }

  async function getPlanets() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const responseJSON = await response.json();
    const newData = deleteResidents(responseJSON.results);
    setData(newData);
    setLoading(false);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <div>
      <FetchContext.Provider value={ { data, loading } }>
        {children}
      </FetchContext.Provider>
    </div>
  );
}

export default FetchProvider;
