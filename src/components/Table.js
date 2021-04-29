import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import fetchPlanets from '../services/starWarsPlanetsAPI';

function Table() {
  const { data, setData } = useContext(MyContext);

  useEffect(() => {
    fetchPlanets()
      .then((json) => setData(json.results));
  }, [setData]);

  console.log(data);

  function planets(a) {
    return (
      <tbody>
        {a.map((e) => (
          <tr key={ e.name }>
            <td>{ e.name }</td>
            <td>{ e.rotation_period }</td>
            <td>{ e.orbital_period }</td>
            <td>{ e.diameter }</td>
            <td>{ e.climate }</td>
            <td>{ e.gravity }</td>
            <td>{ e.terrain }</td>
            <td>{ e.surface_water }</td>
            <td>{ e.population }</td>
            <td>{ e.films }</td>
            <td>{ e.created }</td>
            <td>{ e.edited }</td>
            <td>{ e.url }</td>
          </tr>))}
      </tbody>);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      { planets(data) }
    </table>
  );
}

export default Table;
