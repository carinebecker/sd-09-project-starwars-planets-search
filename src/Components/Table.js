import React, { useContext } from 'react';
import planetsContext from '../Context/planetsContext';

function Table() {
  const {
    planets,
    filteredPlanets,
    loading,
  } = useContext(planetsContext);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {!loading && Object.keys(planets[0])
              .filter((item) => item !== 'residents')
              .map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {!loading && filteredPlanets
            .map((planet) => (
              <tr key={ planet.name }>
                {Object.entries(planet)
                  .filter((item) => item[0] !== 'residents')
                  .map((item) => {
                    if (item[0] === 'name') {
                      return <td key={ item[0] } data-testid="planet-name">{item[1]}</td>;
                    }
                    return <td key={ item[0] }>{item[1]}</td>;
                  })}
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
