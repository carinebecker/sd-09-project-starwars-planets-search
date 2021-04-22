import React, { useContext } from 'react';
import SWContext from '../Services/SWContext';

function Table() {
  const { filteredPlanets } = useContext(SWContext);
  // console.log("teste filteredPlanets", filteredPlanets);
  // const showFilters = (filtersArray) => {
  //   if (filtersArray.length === 0) return <span>no filters used</span>
  // }
  const renderTable = (planetsArray) => {
    console.log(planetsArray);
    if (planetsArray.length !== 0) {
      console.log('teste');
      return (
        <table>
          <thead>
            <tr>
              { Object.keys(planetsArray[0])
                .map((key) => key !== 'residents' && <th key={ key }>{ key }</th>)}
            </tr>
          </thead>
          <tbody>
            { planetsArray.map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>
                  <ul>
                    { planet.films
                      .map((el) => <li key={ el }><a href={ el }>{ el }</a></li>) }
                  </ul>
                </td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <span>Loading...</span>;
  };

  return (
    <>
      { renderTable(filteredPlanets) }
      {/* { showFilters(filterByNumericValues) } */}
    </>
  );
}

export default Table;
