import React, { useState, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../service/StarWarsApi';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const planetsApi = await getPlanets();
      setData(planetsApi);
    };
    fetchData();
  }, []);

  return (
    <main>
      <StarWarsContext.Provider value={ data }>
        {children}
      </StarWarsContext.Provider>
    </main>
  );
}

export default StarWarsProvider;
