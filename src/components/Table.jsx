import React, { useContext } from 'react';
import { SwPlanetsContext } from '../context/SWPlanetsContext';

function Table() {
  const { planets, headers } = useContext(SwPlanetsContext);
  const RESIDENTS_INDEX = 9;
  return (
    <table>
      <thead>
        <tr>
          { headers
            .map((header, index) => (index !== RESIDENTS_INDEX) && (
              <th key={ header }>{ header }</th>
            )) }
        </tr>
      </thead>
      <tbody>
        { planets.map((planet) => (
          <tr key={ planet.name }>
            { Object.values(planet).map((data, index) => (index !== RESIDENTS_INDEX) && (
              <td key={ `${planet.name}-${index}` }>{ data }</td>
            )) }
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
