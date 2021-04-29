import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';

function filterByValues(list, filterByNumericValues) {
  let planetsFiltered = [];

  filterByNumericValues.forEach((element) => {
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

function Table() {
  const { contextValue } = useContext(PlanetContext);
  const { data, filters } = contextValue;
  const { filterByNumericValues } = filters;
  const { name } = filters.filterByName;

  function renderTable(array) {
    if (array.length !== 0) {
      return (
        <table>
          <thead>
            <tr>
              {
                Object.keys(array[0])
                  .map((keyName) => <th key={ keyName }>{ keyName }</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              array.map((planet) => (
                <tr
                  key={ planet.name }
                >
                  { Object.values(planet).map((value) => (
                    <td
                      key={ value }
                    >
                      { value }
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      );
    }

    if (array.length === 0) return (<span>sem resultados</span>);
  }

  function filter(nam) {
    return data.filter((element) => element.name.includes(nam));
  }

  console.log(data);
  if (data.length > 0) {
    if (name) {
      const dataFiltered = filter(name);

      if (filterByNumericValues.length > 0) {
        return renderTable(filterByValues(dataFiltered, filterByNumericValues));
      }

      return renderTable(dataFiltered);
    }

    if (filterByNumericValues.length > 0) {
      return renderTable(filterByValues(data, filterByNumericValues));
    }

    return renderTable(data);
  }

  return (
    <span>Carregando...</span>
  );
}

export default Table;
