import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function StarWarsTable() {
  const { data, loading, filters } = useContext(PlanetsContext);

  if (loading) return <Loading />;
  if (data === {}) return <Loading />;
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((item) => (
            <th key={ item }>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.filter((item) => item.name.includes(filters)).map((planet) => (
          <tr key={ planet }>
            {Object.values(planet).map((value) => (<td key={ value }>{value}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StarWarsTable;
