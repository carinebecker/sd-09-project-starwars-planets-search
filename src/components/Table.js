import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);
  if (!data.results) return <div>loading</div>;
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data.results[0]).map((key) => <th key={ key }>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        { data.results.map((planet, index) => (
          <tr key={ index }>
            { Object.values(planet)
              .map((value) => <td key={ value }>{value}</td>) }
          </tr>)) }
      </tbody>
    </table>
  );
}

export default Table;
