import React, { useContext } from 'react';
import planetsContext from '../Context/planetsContext';

function Table() {
  const { planets, loading, filterByName } = useContext(planetsContext);
  return (
    <table>
      <thead>
        <tr>
          {!loading && Object.keys(planets[0])
            .filter((item) => item !== 'residents')
            .map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {!loading && planets
          .filter((planet) => planet.name.includes(filterByName))
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.entries(planet)
                .filter((item) => item[0] !== 'residents')
                .map((item) => <td key={ item[0] }>{item[1]}</td>)}
            </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
