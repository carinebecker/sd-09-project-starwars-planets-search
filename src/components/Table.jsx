import React, { useContext, useEffect, useCallback } from 'react';
import DataApiContext from '../context/DataApiContext';

const Table = () => {
  const {
    data,
    filters,
    isFetching,
    sortColumn,
  } = useContext(DataApiContext);

  const tablePlanets = (planets) => (
    planets.map((eachElement) => (
      <tr key={ eachElement.name }>
        {Object.values(eachElement).map((eachValue) => (
          <td key={ eachValue }>
            {eachValue}
          </td>
        ))}
      </tr>
    ))
  );

  const filterPlanets = () => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    let filteredPlanets = data.filter(({
      name: planetName,
    }) => planetName.toLowerCase().includes(name.toLowerCase()));
    filterByNumericValues.forEach((planet) => {
      const { comparison, column, value } = planet;
      if (comparison === 'maior que') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => +(eachPlanet[column]) > +(value));
      } else if (comparison === 'menor que') {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => +(eachPlanet[column]) < +(value));
      } else {
        filteredPlanets = filteredPlanets
          .filter((eachPlanet) => +(eachPlanet[column]) === +(value));
      }
      // +() converte string para number
    });
    if (filteredPlanets.length) {
      return tablePlanets(filteredPlanets);
    }
    return tablePlanets(data);
  };

  const sortPlanets = useCallback(() => {
    const { order: { sort, column } } = sortColumn;
    const lowCaseColumn = column.toLowerCase();
    console.log(lowCaseColumn);
    let sorteredPlanets = [];
    if (sort === 'ASC') {
      console.log(lowCaseColumn);
      if (typeof lowCaseColumn === 'number') {
        sorteredPlanets = data.sort((a, b) => a[lowCaseColumn] - b[lowCaseColumn]);
      } else {
        sorteredPlanets = data
          .sort((a, b) => a[lowCaseColumn].localeCompare(b[lowCaseColumn]));
      }
      console.log(sorteredPlanets, 'a', lowCaseColumn, sort);
    } if (sort === 'DESC') {
      if (typeof lowCaseColumn === 'number') {
        sorteredPlanets = data.sort((a, b) => b[lowCaseColumn] - a[lowCaseColumn]);
      } else {
        sorteredPlanets = data
          .sort((a, b) => b[lowCaseColumn].localeCompare(a[lowCaseColumn]));
      }
    }
    return sorteredPlanets;
  });

  useEffect(() => {
    sortPlanets();
  }, [sortPlanets], sortPlanets);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>Tabela</h1>
      <table>
        <thead>
          <tr>
            {
              Object.keys(data[0]).map((eachKey) => <th key={ eachKey }>{eachKey}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            filterPlanets()
          }
        </tbody>
      </table>
    </>
  );
};

export default Table;
