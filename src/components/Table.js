import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { fetchPlanets } from '../services/starWarsPlanetsAPI';

function Table() {
  const {
    data,
    setData,
    filteredData,
    setFilteredData,
    isFetching,
    setIsFetching,
  } = useContext(MyContext);

  function getTable() {
    fetchPlanets()
      .then((json) => setData(json.results))
      .then(() => setIsFetching(false));
  }

  useEffect(() => {
    getTable();
  }, []);

  useEffect(() => {
    const minus1 = -1;
    setFilteredData(data.sort((a, b) => (a.name > b.name ? 1 : minus1)));
  }, [data]);

  function planets(a) {
    return (
      <tbody>
        {a.map((e) => (
          <tr key={ e.name }>
            <td data-testid="planet-name">{ e.name }</td>
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

  if (isFetching) {
    return (
      <h3>Loading</h3>
    );
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
      { planets(filteredData) }
    </table>
  );
}

export default Table;
