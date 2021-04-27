import React, { useContext, useState } from 'react';
import FetchContext from '../context/FetchContext';

function Table() {
  const { data, loading } = useContext(FetchContext);
  const [filters, setFilters] = useState();

  function dataHeaders() {
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

  function dataValues() {
    if (typeof filters !== 'undefined') {
      const filteredData = data.filter(
        (currentValue) => currentValue.name.toUpperCase().includes(filters.toUpperCase()),
      );
      return filteredData.map((currentValue) => (
        parametersValues(currentValue)
      ));
    }
    return (
      data.map((currentValue) => (
        parametersValues(currentValue)
      )));
  }

  function handleChange({ target }) {
    setFilters(target.value);
  }

  if (loading) {
    return 'Loading...';
  }
  return (
    <div>
      <label htmlFor="name-filter">
        Filtrar:
        <input
          data-testid="name-filter"
          type="text"
          onChange={ handleChange }
        />
      </label>
      <table>
        <thead>
          <tr>
            {dataHeaders()}
          </tr>
        </thead>
        <tbody>
          {dataValues()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
