import React, { useState, useEffect } from 'react';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/Table';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [responseApi, setResponseApi] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [numFilter, setNumFilter] = useState();
  const [filters, setFilters] = useState(
    {
      filterByName: { name: '' },
      filterByNumericValues: [],
    },
  );

  useEffect(() => {
    if (responseApi === undefined) {
      const fetchApi = async () => {
        try {
          const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
            .then((response) => response.json());
          setResponseApi(data.results);
        } catch (error) {
          console.log(error);
        }
      };
      fetchApi();
    }
  }, [responseApi]);

  useEffect(() => {
    if (filters.filterByNumericValues.length < 1 && numFilter !== undefined) {
      setFilters({
        filterByName: { name: nameFilter },
        filterByNumericValues: [numFilter],
      });
    } else if ((filters.filterByNumericValues[filters.filterByNumericValues.length - 1]
      !== numFilter)) {
      setFilters({
        filterByName: { name: nameFilter },
        filterByNumericValues: [...filters.filterByNumericValues, numFilter],
      });
    } else if (nameFilter !== filters.filterByName.name) {
      setFilters({
        filterByName: { name: nameFilter },
        filterByNumericValues: [],
      });
    }
  }, [nameFilter, numFilter, filters]);

  return (
    <div className="App">
      <StarWarsContext.Provider
        value={ { responseApi, filters, numFilter, setNumFilter } }
      >
        <input
          value={ nameFilter }
          onChange={ ({ target }) => setNameFilter(target.value) }
          data-testid="name-filter"
        />
        <Filter />
        <Table />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
