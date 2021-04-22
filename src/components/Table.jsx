import React, { useContext } from 'react';
import { MyContext } from '../MyContext';

function Table() {
  const { data, isLoading, keysData } = useContext(MyContext);

  return (isLoading ? <p>Loading...</p> : (
    <div>
      <table>
        <tbody>
          <tr>
            {keysData.filter((element) => element !== 'residents')
              .map((newElement) => (
                <td key={ newElement }>
                  <h3>{newElement}</h3>
                </td>
              ))}
          </tr>
          {data
            .map((item) => (
              <tr key={ Math.random() }>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.rotation_period}
                </td>
                <td>
                  {item.orbital_period}
                </td>
                <td>
                  {item.diameter}
                </td>
                <td>
                  {item.climate}
                </td>
                <td>
                  {item.gravity}
                </td>
                <td>
                  {item.terrain}
                </td>
                <td>
                  {item.surface_water}
                </td>
                <td>
                  {item.population}
                </td>
                <td>
                  {item.films.map((film) => film)}
                </td>
                <td>
                  {item.created}
                </td>
                <td>
                  {item.edited}
                </td>
                <td>
                  {item.url}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
  );
}

export default Table;
