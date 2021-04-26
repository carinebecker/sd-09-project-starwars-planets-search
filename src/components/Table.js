import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { loading, dataFilter } = useContext(TableContext);

  const tableTitle = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];

  const getTableTitle = () => (
    tableTitle.map((title) => <th key={ title }>{ title }</th>));

  const getTableResult = () => dataFilter.map((planet) => (
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
      <td>{ planet.films }</td>
      <td>{ planet.created }</td>
      <td>{ planet.edited }</td>
      <td>{ planet.url }</td>
    </tr>
  ));

  return loading ? (<p>Carregando...</p>) : (
    <table>
      <thead>
        <tr>
          { getTableTitle() }
        </tr>
      </thead>
      <tbody>
        { getTableResult() }
      </tbody>
    </table>
  );
}

export default Table;
