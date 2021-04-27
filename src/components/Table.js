import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const Table = () => {
  const {
    data: { planetsList },
    filteredData: { filteredPlanetsList, isFiltering },
  } = useContext(PlanetsContext);

  const list = isFiltering ? filteredPlanetsList : planetsList;

  return (
    <table>
      <thead>
        <tr>
          { planetsList[0]
           && Object.keys(planetsList[0])
             .filter((columnName) => columnName !== 'residents')
             .map((columnName) => <th key={ columnName }>{ columnName }</th>) }
        </tr>
      </thead>
      <tbody>
        { list.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};

export default Table;
