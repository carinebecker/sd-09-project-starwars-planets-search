import React, { useContext } from 'react';
import myContext from '../provider/StarWarsContext';

function TablePlanets() {
  const {
    planets,
  } = useContext(myContext);

  const details = Object.keys(planets[0]);
  delete details[9];

  return (
    <table>
      <thead>
        <tr>
          {details.map((detail) => (
            <th key={ detail }>{detail}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet, index) => (
          <tr key={ `${planet}${index}` }>
            {details.map((detail) => {
              if (detail === 'name') {
                return (
                  <td
                    key={ `${planet}${detail}` }
                    data-testid="planet-name"
                  >
                    {planet[detail]}
                  </td>
                );
              }
              return (<td key={ `${planet}${detail}` }>{planet[detail]}</td>);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablePlanets;
