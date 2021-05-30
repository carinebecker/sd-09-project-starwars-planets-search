import React, { useContext } from 'react';
import AppContext from './Context';

const RenderRow = () => {
  const {
    data, name, column, comparison, value, activateButton } = useContext(AppContext);

  let filtered = data;
  if (data !== undefined && name.length > 0) {
    filtered = data.filter((itens) => itens.name.includes(name));
  }

  if (activateButton && comparison === 'maior que') {
    filtered = filtered.filter((itens) => itens[column] > Number(value));
  } if (activateButton && comparison === 'igual a') {
    filtered = filtered.filter((itens) => itens[column] === value);
  } if (activateButton && comparison === 'menor que') {
    filtered = filtered.filter((itens) => itens[column] < Number(value));
  }

  if (data !== undefined) {
    const noFilter = filtered.map((planets) => (
      <tr key={ planets.name }>
        <td data-testid="planet-name">{ planets.name }</td>
        <td>{ planets.rotation_period }</td>
        <td>{ planets.orbital_period }</td>
        <td>{ planets.diameter }</td>
        <td>{ planets.climate }</td>
        <td>{ planets.gravity }</td>
        <td>{ planets.terrain }</td>
        <td>{ planets.surface_water }</td>
        <td>{ planets.population }</td>
      </tr>
    ));
    return noFilter;
  }
  return <div>Loading...</div>;
};

export default RenderRow;
