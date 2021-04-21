import React, { useContext } from 'react';
import SWContext from '../context/SWContext';
import Data from '../testData';

function Planets() {
  const { planets } = useContext(SWContext);
  console.log('PlanetsTable', planets);

  const tHead = [
    'Climate',
    'Created',
    'Diameter',
    'Edited',
    'Films',
    'Gravity',
    'Name',
    'Orbital Period',
    'Population',
    'Rotation Period',
    'Surface Water',
    'Terrain',
    'url',
  ];

  return (
    <table>
      <thead>
        <tr>
          {tHead.map((item, index) => <th key={ index }>{ item }</th>)}
        </tr>
      </thead>
      <tbody>
        {Data.results.map((item) => (
          <tr key={ Math.random() }>
            <td>{ item.climate }</td>
            <td>{ item.created }</td>
            <td>{ item.diameter }</td>
            <td>{ item.edited }</td>
            <td>{ item.films }</td>
            <td>{ item.gravity }</td>
            <td>{ item.name }</td>
            <td>{ item.orbital_period }</td>
            <td>{ item.population }</td>
            <td>{ item.rotation_period }</td>
            <td>{ item.surface_water }</td>
            <td>{ item.terrain }</td>
            <td>{ item.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Planets;
