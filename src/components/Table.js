import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Table() {
  const { data, filteredByName } = useContext(StarwarsContext);
  const filteredPlanets = (data.results)
    ? data.results.filter((planets) => (
      planets.name.includes(filteredByName.filters.filterByName.name)))
    : '';

  return (
    <table>
      <thead>
        <tr>
          { !data.results ? <td />
            : Object.keys(data.results[0]).map((value) => <th key={ value }>{value}</th>)}
        </tr>
      </thead>
      <tbody>
        { !filteredPlanets ? <tr />
          : filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value) => (<td key={ value }>{value}</td>))}
            </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
