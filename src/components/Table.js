import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);

  const loading = () => <span>Carregando...</span>;

  return (
    <table>
      <thead>
        {/* {data[0] && console.log(data[0].map((el) => Object.keys(el)))} */}
        <tr>
          {!data[0] ? loading() : data[0].map((planet, i) => (
            <th key={ planet.name }>{Object.keys(planet)[i]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data[0] && data[0].map((planet, index) => (
          <tr key={ index }>
            {Object.values(planet).map((attr) => (
              <td key={ attr }>{attr}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
