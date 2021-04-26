import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

function Table() {
  const { data, loading } = useContext(FetchContext);

  function dataHeaders() {
    return (
      Object.keys(data[0]).map(
        (currentValue) => <th key={ currentValue }>{currentValue}</th>,
      )
    );
  }

  function dataValues() {
    return (
      data.map((currentValue) => (
        <tr key={ currentValue.name }>
          <td>{ currentValue.name }</td>
          <td>{ currentValue.rotation_period }</td>
          <td>{ currentValue.orbital_period}</td>
          <td>{ currentValue.diameter}</td>
          <td>{ currentValue.climate}</td>
          <td>{ currentValue.gravity }</td>
          <td>{ currentValue.terrain }</td>
          <td>{ currentValue.surface_water }</td>
          <td>{ currentValue.population }</td>
          <td>{ currentValue.films }</td>
          <td>{ currentValue.created }</td>
          <td>{ currentValue.edited }</td>
          <td>{ currentValue.url }</td>
        </tr>
      )));
  }

  if (loading) {
    return 'Loading...';
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            {dataHeaders()}
          </tr>
        </thead>
        <tbody>
          {dataValues()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
