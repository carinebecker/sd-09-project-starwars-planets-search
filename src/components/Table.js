import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

const Table = () => {
  const { data, isFetched } = useContext(PlanetsContext);
  const [filteredData, filteredDataSet] = useState(null);
  const [nameFilter, nameFilterSet] = useState('');

  useEffect(() => {
    if (isFetched) {
      filteredDataSet(data.filter((planet) => (
        planet.name.toLowerCase().includes(nameFilter.toLowerCase())
      )));
    }
  }, [data, isFetched, nameFilter]);
  return (
    (isFetched && filteredData)
      ? (
        <>
          <form>
            <label htmlFor="name-filter">
              Pesquisar por nome
              <input
                id="name-filter"
                value={ nameFilter }
                onChange={ (event) => nameFilterSet(event.target.value) }
                data-testid="name-filter"
              />
            </label>
          </form>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ROTATION PERIOD</th>
                <th>ORBITAL PERIOD</th>
                <th>DIAMETER</th>
                <th>CLIMATE</th>
                <th>GRAVITY</th>
                <th>TERRAIN</th>
                <th>SURFACE WATER</th>
                <th>POPULATION</th>
                <th>FILMS</th>
                <th>CREATED AT</th>
                <th>EDITED AT</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredData.map((planet, index) => (
                  <tr key={ index }>
                    <td>{ planet.name }</td>
                    <td>{ planet.rotation_period }</td>
                    <td>{ planet.orbital_period }</td>
                    <td>{ planet.diameter }</td>
                    <td>{ planet.climate }</td>
                    <td>{ planet.gravity }</td>
                    <td>{ planet.terrain }</td>
                    <td>{ planet.surface_water }</td>
                    <td>{ planet.population }</td>
                    <td>{ planet.created }</td>
                    <td>{ planet.edited }</td>
                    <td>{ planet.films }</td>
                    <td>{ planet.url }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </>
      )
      : <div>b</div>
  );
};

export default Table;
