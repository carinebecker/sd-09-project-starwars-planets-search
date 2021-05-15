import React, { useState, useEffect } from 'react';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/Table';
import './App.css';

function App() {
  const [responseApi, setResponseApi] = useState();

  useEffect(() => {
    if (responseApi === undefined) {
      const fetchApi = async () => {
        try {
          const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
            .then((response) => response.json());
          setResponseApi(data.results);
          // console.log(data.results);
        } catch (error) {
          console.log(error);
        }
      };
      fetchApi();
    }
  }, [responseApi]);

  return (
    <StarWarsContext.Provider value={ responseApi }>
      <Table />
    </StarWarsContext.Provider>
  );
}

export default App;
