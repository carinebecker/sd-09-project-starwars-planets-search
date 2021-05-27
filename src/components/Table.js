import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Table() {
  const { data, numericFiltered } = useContext(StarwarsContext);
  const filteredPlanets = (filteredByNumeric.filterByNumeric.column)
    ? data.results.filter((planet) => (
      planet.filteredByNumeric.filterByNumeric.column
        >= filteredByNumeric.filterByNumeric.value))
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
        { filteredPlanets && numericFiltered.length === 0
          ? filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value) => (<td key={ value }>{value}</td>))}
            </tr>))
          : numericFiltered.map((planet) => (
            <tr key={ planet.name }>
              {!planet ? <td />
                : Object.values(planet).map((value) => <td key={ value }>{value}</td>)}
            </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
