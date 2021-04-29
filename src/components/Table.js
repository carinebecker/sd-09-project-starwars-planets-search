import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, filterPlanets } = useContext(PlanetsContext);
  const dinamicRow = (element, index) => (
    <tr key={ index }>
      {
        Object.values(element).map((elementPlanets, key) => (
          <td key={ key }>
            {elementPlanets}
          </td>))
      }
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation_period</th>
          <th>Orbital_period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filterPlanets.length > 0
          ? filterPlanets.map((element, index) => dinamicRow(element, index))
          : planets.map((element, index) => dinamicRow(element, index))}
      </tbody>
    </table>
  );
}

export default Table;
