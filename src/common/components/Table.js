import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';

function Table() {
  const { contextValue, filterClicked, setFilterClicked } = useContext(PlanetContext);
  const { data, filters } = contextValue;
  const { filterByNumericValues } = filters;
  const { name } = filters.filterByName;
  // const { column, comparison, value } = filters.filterByNumericValues[0];

  function renderTable(array) {
    // if (array === null || array === undefined) {
    //   array = {};
    // }
    if (array.length !== 0) {
      return (
        <table>
          <thead>
            <tr>
              {
                Object.keys(array[0]).map((keyName) => <th key={ keyName }>{ keyName }</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              array.map((planet) => <tr key={ planet.name }>{ Object.values(planet).map((value) => <td key={ value }>{ value }</td>) }</tr>)
            }
          </tbody>
        </table>
      );
    }
    if (!(array.length !== 0)) return (<span>sem resultados</span>);
    // return (
    //   <>
    //     { 'Sem resultados de busca' }
    //   </>
    // );

  }

  function filter(name) {
    return data.filter((element) => element.name.includes(name));
  }

  function filterByValues(list) {
    let planetsFiltered = [];

    filterByNumericValues.forEach((element) =>  {
      const { column, comparison, value } = element;

      if (comparison === 'maior que') {
        planetsFiltered = list.filter((planet) => Number(planet[column]) > Number(value));
      }
      if (comparison === 'menor que') {
        planetsFiltered = list.filter((planet) => Number(planet[column]) < Number(value));
      }
      if (comparison === 'igual a') {
        planetsFiltered = list.filter((planet) => Number(planet[column]) === Number(value));
      }

    });
    return planetsFiltered;
  }

  console.log(data);
  if (data.length > 0) {
    if (name) {
      const dataFiltered = filter(name);

      if ( filterByNumericValues.length > 0 ) {
        return renderTable(filterByValues(dataFiltered));
      }

      return renderTable(dataFiltered);
    }

    if ( filterByNumericValues.length > 0 ) {
      return renderTable(filterByValues(data));
    }

    return renderTable(data);
  }

  return (
    <span>Carregando...</span>
  );
}

export default Table;
