import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filter() {
  const {
    setPlanetFilteredByName,
    fieldFiltering,
    setFieldFiltering,
    data,
    setDataFilter,
  } = useContext(TableContext);

  const searchByPlanet = ({ target }) => {
    const { value } = target;
    setPlanetFilteredByName({ filterByName: { name: value } });
  };

  const valueInputs = ({ target }) => {
    const { name, value } = target;
    setFieldFiltering({
      ...fieldFiltering,
      [name]: value,
    });
  };

  const handleClick = () => {
    const filteredPlanets = data;
    const { column, comparison, value } = fieldFiltering;
    if (comparison === 'maior que') {
      setDataFilter(filteredPlanets.filter((planet) => (
        planet[column] > Number(value)
      )));
    }
    if (comparison === 'menor que') {
      setDataFilter(filteredPlanets.filter((planet) => (
        planet[column] < Number(value)
      )));
    }
    if (comparison === 'igual a') {
      setDataFilter(filteredPlanets.filter((planet) => (
        planet[column] === value
      )));
    }
  };

  return (
    <>
      <input type="text" data-testid="name-filter" onChange={ searchByPlanet } />

      <select data-testid="column-filter" name="column" onChange={ valueInputs }>
        <option>diameter</option>
        <option>orbital_period</option>
        <option>population</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select data-testid="comparison-filter" name="comparison" onChange={ valueInputs }>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ valueInputs }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </>
  );
}

export default Filter;
