import React, { useContext, useState } from 'react';
import FetchContext from '../context/FetchContext';

function Table() {
  const { data, loading } = useContext(FetchContext);
  const [filters, setFilters] = useState();
  const [clicked, setClicked] = useState(true);
  const [newData, setNewData] = useState([]);
  const [numericFilters, setNumericFilters] = useState(
    { column: '', comparison: '', value: '' },
  );

  function tableHeaders() {
    if (clicked === false && newData.length > 0) {
      return (
        Object.keys(newData[0]).map(
          (currentValue) => <th key={ currentValue }>{currentValue}</th>,
        )
      );
    }
    return (
      Object.keys(data[0]).map(
        (currentValue) => <th key={ currentValue }>{currentValue}</th>,
      )
    );
  }

  function parametersValues(currentValue) {
    return (
      <tr key={ currentValue.name }>
        <td>{ currentValue.name }</td>
        <td>{ currentValue.rotation_period }</td>
        <td>{ currentValue.orbital_period}</td>
        <td>{ currentValue.diameter}</td>
        <td>{ currentValue.climate}</td>
        <td>{ currentValue.gravity }</td>
        <td>{ currentValue.terrain }</td>
        <td>{ currentValue.surface_water }</td>
        <td>{ currentValue.population }</td>
        <td>{ currentValue.films }</td>
        <td>{ currentValue.created }</td>
        <td>{ currentValue.edited }</td>
        <td>{ currentValue.url }</td>
      </tr>

    );
  }

  function tableValues() {
    if (typeof filters !== 'undefined') {
      const filteredData = data.filter(
        (currentValue) => currentValue.name.toUpperCase().includes(filters.toUpperCase()),
      );
      return filteredData.map((currentValue) => (
        parametersValues(currentValue)
      ));
    }
    if (clicked === false) {
      return (
        newData.map((currentValue) => (
          parametersValues(currentValue)
        )));
    }
    return (
      data.map((currentValue) => (
        parametersValues(currentValue)
      )));
  }

  function handleChange({ target }) {
    setFilters(target.value);
  }

  function changeNumericFilter({ target }) {
    setNumericFilters({
      ...numericFilters,
      [target.name]: target.value,
    });
  }

  function getTable() {
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders()}
          </tr>
        </thead>
        <tbody>
          {tableValues()}
        </tbody>
      </table>
    );
  }

  function handleClick() {
    const { column, comparison, value } = numericFilters;
    setClicked(false);
    let dataNumericFilter;
    if (comparison === 'maior que') {
      dataNumericFilter = data.filter(
        (currentValue) => parseInt(currentValue[column], 10) > parseInt(value, 10),
      );
    } else if (comparison === 'menor que') {
      dataNumericFilter = data.filter(
        (currentValue) => parseInt(currentValue[column], 10) < parseInt(value, 10),
      );
    } else if (comparison === 'igual a') {
      dataNumericFilter = data.filter(
        (currentValue) => parseInt(currentValue[column], 10) === parseInt(value, 10),
      );
    }
    setNewData(dataNumericFilter);
    getTable();
  }

  if (loading) {
    return 'Loading...';
  }
  return (
    <div>
      <div>
        <label htmlFor="name-filter">
          Filtrar por nome:
          <input
            data-testid="name-filter"
            type="text"
            onChange={ handleChange }
          />
        </label>

        <br />
        <br />

        <label htmlFor="column-filter">
          Filtro avançado:
          <select
            data-testid="column-filter"
            name="column"
            onChange={ changeNumericFilter }
          >
            <option disabled selected value> -- select an option -- </option>
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            name="comparison"
            onChange={ changeNumericFilter }
          >
            <option disabled selected value> -- select an option -- </option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value-filter">
          <input
            type="number"
            data-testid="value-filter"
            name="value"
            onChange={ changeNumericFilter }
            placeholder="0"
            min="0"
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          name="button"
          onClick={ handleClick }
        >
          Filtrar
        </button>

        <hr />
        <br />
        {getTable()}
      </div>
    </div>
  );
}

export default Table;
