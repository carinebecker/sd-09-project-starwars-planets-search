import React, { useContext } from 'react';
import SWContext from '../context/SWContext';
import '../App.css';

export default function TablePlanets() {
  const { data, filters } = useContext(SWContext);
  const { filterByName: { name } } = filters;

  function findPlanets() {
    let findedPlanet = data.filter(
      (planet) => planet.name.toLowerCase().includes(name),
    );

    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((element, index) => {
        const { column, comparison, value } = filters.filterByNumericValues[index];
        if (comparison === 'maior que') {
          findedPlanet = findedPlanet
            .filter((planet) => Number(planet[column]) > Number(value));
        } else if (comparison === 'menor que') {
          findedPlanet = findedPlanet
            .filter((planet) => Number(planet[column]) < Number(value));
        } else {
          findedPlanet = findedPlanet
            .filter((planet) => Number(planet[column]) === Number(value));
        }
      });
    }
    return findedPlanet;
  }

  return (
    <table className="table-planets">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        { findPlanets().map((planet) => (
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
        ))}
      </tbody>
    </table>
  );
}
