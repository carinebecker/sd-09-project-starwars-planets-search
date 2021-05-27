import React, { useContext, useState } from 'react';
import planetsContext from '../Context/planetsContext';

function Table() {
  const {
    planets,
    loading,
    filterByName,
    filterByNumber } = useContext(planetsContext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  const planetListUpdater = () => {
    filterByNumber.forEach(({ column, comparison, value }) => {
      switch (comparison) {
      case '>':
        setFilteredPlanets(planets.filter((planet) => planet[column] > value)); break;
      case '<':
        setFilteredPlanets(planets.filter((planet) => planet[column] < value)); break;
      case '===':
        setFilteredPlanets(planets.filter((planet) => planet[column] === value)); break;
      default: setFilteredPlanets(planets);
      }
    });
  };
  planetListUpdater();
  console.log(filteredPlanets);

  return (
    <div>
      <div>
        {filterByNumber
          .map((filter) => (
            <p key={ filter.column }>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
          ))}
      </div>
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
            .filter((planet) => planet.name.includes(filterByName))
            .map((planet) => (
              <tr key={ planet.name }>
                {Object.entries(planet)
                  .filter((item) => item[0] !== 'residents')
                  .map((item) => <td key={ item[0] }>{item[1]}</td>)}
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
