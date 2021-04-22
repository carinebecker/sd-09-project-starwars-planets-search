import React, { useContext } from 'react';
import StateContext from '../context/stateContext';

const Table = () => {
  const { planets,
    headers,
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
  } = useContext(StateContext);

  const comparisonReducer = (element, { comparison, value, column }) => {
    switch (comparison) {
    case 'maior que':
      return element.filter((planet) => Number(planet[column]) > Number(value));

    case 'menor que':
      return element.filter((planet) => Number(planet[column]) < Number(value));

    case 'igual a':
      return element.filter((planet) => Number(planet[column]) === Number(value));

    default:
      return element;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {
            headers
              .map((element, index) => <th key={ index }>{element}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          filterByNumericValues
            .reduce(comparisonReducer, planets)
            .filter((planet) => (planet.name).includes(name))
            .map((planet, index) => (
              <tr key={ index }>
                {
                  Object.entries(planet)
                    .map(([key, info]) => (
                      <td
                        data-testid={ key === 'name' ? 'planet-name' : '' }
                        key={ info }
                      >
                        {info}
                      </td>))
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};

export default Table;
