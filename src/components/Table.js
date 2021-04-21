import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);

  const loading = () => <span>Carregando...</span>;

  return (
    <table>
      <thead>
        <tr>
          {
            !data[0] ? loading() : Object.keys(data[0][0])
              .map((key, index) => <th key={ index }>{key}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          data[0] && data[0].map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((value) => (
                <td key={ value }>{value}</td>))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
