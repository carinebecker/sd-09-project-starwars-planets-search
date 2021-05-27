import React, { useContext, useEffect } from 'react';
import AppContext from '../appContext/Context';
import headerNames from '../data/headerNames';

const Table = () => {
  const { data,
    setData,
    name,
    column,
    comparison,
    value,
    activateButton } = useContext(AppContext);
  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    getPlanets();
  }, [setData]);

  const renderHeader = () => (
    <tr>
      {
        headerNames.map((header) => (
          <td key={ header }>
            <th>{ header }</th>
          </td>))
      }
    </tr>
  );

  const renderRow = () => {
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
          <td>{ planets.name }</td>
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

  return (
    <table>
      <tbody>
        { renderHeader() }
      </tbody>
      <tbody>
        { renderRow() }
      </tbody>
    </table>
  );
};

export default Table;
