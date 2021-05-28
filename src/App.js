import React, { useState, useEffect } from 'react';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/Table';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [responseApi, setResponseApi] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [numFilter, setNumFilter] = useState();

  const [colSelected, setColSelected] = useState();
  const [orientation, setOrientation] = useState();
  const [sort, setSort] = useState();

  const [filters, setFilters] = useState(
    {
      filterByName: { name: '' },
      filterByNumericValues: [],
      order: {
        column: '',
        sort: 'ASC',
      },
    },
  );

  const colOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const funcSort = () => {
    setSort({
      column: colSelected,
      sort: orientation,
    });
  };

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
        order: sort,
      });
    } else if ((filters.filterByNumericValues[filters.filterByNumericValues.length - 1]
      !== numFilter) && numFilter !== undefined) {
      setFilters({
        filterByName: { name: nameFilter },
        filterByNumericValues: [...filters.filterByNumericValues, numFilter],
        order: sort,
      });
    } else if (nameFilter !== filters.filterByName.name) {
      setFilters({
        filterByName: { name: nameFilter },
        filterByNumericValues: [],
        order: sort,
      });
    } else if (filters.order !== sort) {
      setFilters({
        ...filters,
        order: sort,
      });
    }
  }, [nameFilter, numFilter, filters, sort]);

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
        {
          filters.filterByNumericValues.map((filter, index) => (
            <div data-testid="filter" key={ index }>
              <p>{`${filter.column} filter`}</p>
              <button
                type="button"
                onClick={ () => {
                  setNumFilter();
                  setFilters({
                    filterByName: {
                      name: nameFilter,
                    },
                    filterByNumericValues: [
                      ...filters.filterByNumericValues
                        .filter((value) => (value.column !== filter.column)),
                    ],
                  });
                } }
              >
                X
              </button>
            </div>
          ))
        }
        <select
          data-testid="column-sort"
          onChange={ ({ target }) => setColSelected(target.value) }
        >
          {
            colOptions.map((option, index) => <option key={ index }>{option}</option>)
          }
        </select>
        <input
          data-testid="column-sort-input-asc"
          name="sort"
          onChange={ ({ target }) => setOrientation(target.value) }
          type="radio"
          value="ASC"
        />
        <input
          data-testid="column-sort-input-desc"
          name="sort"
          onChange={ ({ target }) => setOrientation(target.value) }
          type="radio"
          value="DESC"
        />
        <button
          data-testid="column-sort-button"
          onClick={ () => funcSort() }
          type="button"
        >
          Sort
        </button>
        <Filter colOptions={ colOptions } />
        <Table />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
