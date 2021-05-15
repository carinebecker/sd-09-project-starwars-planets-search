import React, { useContext } from 'react';
import DataApiContext from '../context/DataApiContext';

const Table = () => {
  const { data, filters, isFetching } = useContext(DataApiContext);

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
    // if (data) {
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
    // }
    return tablePlanets(data);
  };

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
