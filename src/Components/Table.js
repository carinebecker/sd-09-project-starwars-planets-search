import React, { useContext } from 'react';
import planetsContext from '../Context/planetsContext';

function Table() {
  const { planets } = useContext(planetsContext);
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(planets[0])
            .filter((item) => item !== 'residents')
            .map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={ planet.name }>
            {Object.entries(planet)
              .filter((item) => item[0] !== 'residents')
              .map((item) => <td key={ item[1] }>{item[1]}</td>)}
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
