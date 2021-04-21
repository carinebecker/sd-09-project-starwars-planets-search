import React, { useContext } from 'react';
import fetchApiPlanetsContext from '../contexts/ApiContext/fetchApiPlanetsContext';

export default function Table() {
  const { isFetching, data, filters, configFilters,
  } = useContext(fetchApiPlanetsContext);
  const { results } = data;

  function tableHeaders() {
    if (results) {
      const header = results.filter((_, index) => index === 0);
      const keys = Object.keys(header[0]).filter(
        (key) => key !== 'residents',
      );
      return (
        <thead>
          <tr>
            {keys.map(
              (key) => <th key={ key }>{key.toUpperCase().replace('_', ' ')}</th>,
            )}
          </tr>
        </thead>
      );
    }
  }

  function tableBody(planets) {
    return (
      <tbody>
        {planets.map(({
          name,
          rotation_period: rotationPeriod,
          orbital_period: orbitalPeriod,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films,
          created,
          edited,
          url,
        }) => (
          <tr key={ Math.random() }>
            <td>{name}</td>
            <td>{rotationPeriod}</td>
            <td>{orbitalPeriod}</td>
            <td>{diameter}</td>
            <td>{climate}</td>
            <td>{gravity}</td>
            <td>{terrain}</td>
            <td>{surfaceWater}</td>
            <td>{population}</td>
            <td>{films}</td>
            <td>{created}</td>
            <td>{edited}</td>
            <td>{url}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  function renderTableBody() {
    if (results) {
      const newResults = results.filter(({ name }) => name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase()));
      if (configFilters === undefined) {
        return tableBody(newResults);
      }
      return tableBody(configFilters);
    }
  }

  return (
    <>
      {isFetching && <p>Loading</p>}
      <table>
        {tableHeaders()}
        {renderTableBody()}
      </table>
    </>
  );
}
