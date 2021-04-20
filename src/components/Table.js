import React, { useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const [title, setTitle] = useState();
  return (
    <PlanetsContext.Consumer>
      {({ data: value }) => (
        <>
          {setTitle(Object.values(value)[0])}
          <table>
            <thead>
              <tr>
                {title && Object.keys(title).map((key) => (
                  <th key={ key }><strong>{key}</strong></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value && value.map((planet) => (
                <tr key={ planet.name }>
                  {planet && Object.values(planet).map((item) => (
                    <td key={ item }>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </PlanetsContext.Consumer>
  );
}

export default Table;
