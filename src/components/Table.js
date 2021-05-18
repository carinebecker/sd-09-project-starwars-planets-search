import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

function Table() {
  const { dataFromApi, loading, getPlanets } = useContext(StarWarsContext);
  const { planets } = dataFromApi;

  useEffect(() => {
    getPlanets();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <table cellSpacing="0">
      <thead>
        <tr>
          {Object.keys(planets.results[0])
            .map((header, index) => (
              <th className="table" key={ index }>
                { header }
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {planets.results
          .map((result, index) => (
            <tr key={ index }>
              {Object.values(result)
                .map((planet, position) => (
                  <td className="table" key={ position }>
                    { planet }
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
