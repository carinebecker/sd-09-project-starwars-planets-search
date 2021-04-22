import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filters: { filterByName: { name } } } = useContext(PlanetsContext);
  const [searchResults, setSearchResults] = useState([]);

  const loading = () => <span>Carregando...</span>;

  useEffect(() => {
    setSearchResults(Object.values(data).filter((value) => (
      value.name.includes(name))));
  }, [data, name]);

  return (
    <section>
      <table>
        <thead>
          <tr>
            { data.length === 0 ? loading() : Object.keys(data[0]).map((key) => (
              <th key={ key }>{key}</th>)) }
          </tr>
        </thead>
        <tbody>
          { searchResults && searchResults.map((planet, index) => (
            <tr key={ index }>
              { Object.values(planet).map((value) => (
                <td key={ value }>{value}</td>)) }
            </tr>
          )) }
        </tbody>
      </table>
    </section>
  );
}

export default Table;
