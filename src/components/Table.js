import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import '../CSS/table.css';
// import getPlanets from '../services/starwarsApi';

function Table() {
  const { dataToFilter, loading } = useContext(PlanetContext);
  const renderTableHead = () => (
    <thead>
      <tr>
        <th>name</th>
        <th>rotation_period</th>
        <th>orbital_period</th>
        <th>diameter</th>
        <th>climate</th>
        <th>gravity</th>
        <th>terrain</th>
        <th>surface_water</th>
        <th>population</th>
        <th>films</th>
        <th>created</th>
        <th>edited</th>
        <th>url</th>
      </tr>
    </thead>
  );
  const renderTableContent = () => {
    const content = dataToFilter.map((planet, index) => (
      <tr key={ index }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ));
    return content;
  };

  const renderTable = () => (
    <table>
      {renderTableHead()}
      <tbody>
        {renderTableContent()}
      </tbody>
    </table>
  );

  const loadingMessage = () => (<h1>loading</h1>);

  return (
    <>
      {loading && loadingMessage()}
      {!loading && renderTable()}
    </>
  );
}

export default Table;
