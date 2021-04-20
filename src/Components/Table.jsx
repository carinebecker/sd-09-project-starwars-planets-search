import React, { useContext } from 'react';
import fetchApiPlanetsContext from '../contexts/ApiContext/fetchApiPlanetsContext';

export default function Table() {
  const { isFetching, data, filters } = useContext(fetchApiPlanetsContext);
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

  function tableBody() {
    if (results) {
      const newResults = results.filter(({ name }) => name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase()));
      return (
        <tbody>
          {newResults.map(({
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
  }

  return (
    <>
      {isFetching && <p>Loading</p>}
      <table>
        {tableHeaders()}
        {tableBody()}
      </table>
    </>
  );
}
