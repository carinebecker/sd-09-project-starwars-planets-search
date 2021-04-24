import React, { useContext } from 'react';
import SWContext from '../context/SWContext';
import useData from '../effects/useData';

function Table() {
  const { loading, getData, data, filters } = useContext(SWContext);
  useData(data, getData);

  const renderTable = ({ results }) => {
    const residentsIndex = 9;
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(results[0]).map((head, headIndex) => (
              head !== 'residents' && <th key={ headIndex }>{head}</th>))}
          </tr>
        </thead>
        <tbody>
          {results.map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((value, rowIndex) => (
                rowIndex !== residentsIndex && <td key={ rowIndex }>{value}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const checkFilter = () => {
    const { filters: { filterByName: { name } } } = filters;
    const { results } = data;
    if (name.length !== 0) {
      const filterData = { results: results
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())) };
      if (filterData.results.length === 0) return <p>nenhum resultado</p>;
      return renderTable(filterData);
    }
    return renderTable(data);
  };

  return (
    <div className="flex">
      {loading || !data ? 'loading...' : checkFilter()}
    </div>
  );
}

export default Table;
