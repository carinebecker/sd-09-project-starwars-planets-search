import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function StarWarsTable() {
  const { data, loading, filters } = useContext(PlanetsContext);

  const filterName = () => {
    const filteredData = data.filter((item) => item.name
      .includes(filters.filterByName.name));
    return filteredData;
  };

  const filterByValue = () => {
    const filteredData = filterName();
    const filteredValue = filteredData
      .filter((item) => filters.filterByNumericValues.every((obj) => {
        switch (obj.comparison) {
        case 'maior que':
          return +(item[obj.column]) > +(obj.value);

        case 'menor que':
          return +(item[obj.column]) < +(obj.value);

        case 'igual a':
          return +(item[obj.column]) === +(obj.value);

        default:
          return true;
        }
      }));
    console.log(filteredValue);
    return filteredValue;
  };

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
        {filterByValue().map((planet) => (
          <tr key={ planet }>
            {Object.values(planet)
              .map((value) => (<td key={ value }>{value}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StarWarsTable;
