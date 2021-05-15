import React, { useState, useEffect } from 'react';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/Table';
import './App.css';

function App() {
  const [responseApi, setResponseApi] = useState();
  const [namefilter, setNameFilter] = useState();
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

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

  useEffect(() => {
    setFilters({
      filterByName: {
        name: namefilter,
      },
    });
  }, [namefilter]);

  return (
    <div className="App">
      <StarWarsContext.Provider value={ { responseApi, filters } }>
        <input
          value={ namefilter }
          onChange={ ({ target }) => setNameFilter(target.value) }
          data-testid="name-filter"
        />
        <Table />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
