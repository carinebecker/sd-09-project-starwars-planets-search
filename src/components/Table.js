import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const Table = () => {
  const { data } = useContext(StarwarsContext);
  return (
    <table>
      <thead>
        <tr>
          { !data.results ? <tr />
            : Object.keys(data.results[0]).map((value) => <th key={ value }>{value}</th>)}
        </tr>
      </thead>
      <tbody>
        { !data.results ? <tr />
          : data.results.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value) => (<td key={ value }>{value}</td>))}
            </tr>))}
      </tbody>
    </table>
  );
};

export default Table;
