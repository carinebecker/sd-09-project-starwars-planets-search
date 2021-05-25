import React, { useState, useEffect, useContext } from 'react';

import StarwarsContext from '../context/StarwarsContext';

function Form() {
  const {
    filterTypes,
    setFilterTypes,
    filterPlanets,
  } = useContext(StarwarsContext);

  const { filters: { filterByName, filterByNumericValues } } = filterTypes;

  const [numericValues, setNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const checkIfTheFilterAlreadyExists = (value) => {
    return filterByNumericValues.some(({ column }) => column === value);
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      setFilterTypes((prevState) => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          filterByName: {
            name: value,
          },
        },
      }));
    } else {
      setNumericValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleClickBtn = () => {
    const { column } = numericValues;
    const checkColumn = checkIfTheFilterAlreadyExists(column);
    if (!checkColumn) {
      setFilterTypes((prevState) => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          filterByNumericValues: [
            ...prevState.filters.filterByNumericValues,
            numericValues
          ],
        },
      }));
    }
  };

  const columnsItems = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const comparisonItems = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <form action="">
        <label htmlFor="filter">
          Filtrar
          <input
            type="text"
            id="filter"
            name="name"
            value={ filterByName.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
        <select
          name="column"
          onChange={ handleChange }
          value={ numericValues.column }
          data-testid="column-filter"
        >
          {columnsItems.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <select
          name="comparison"
          onChange={ handleChange }
          value={ numericValues.comparison }
          data-testid="comparison-filter"
        >
          {comparisonItems.map((value, index) => <option key={ index }>{ value }</option> )}
        </select>
        <input
          type="number"
          name="value"
          value={ numericValues.value }
          onChange={ handleChange }
          data-testid="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickBtn }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Form;
