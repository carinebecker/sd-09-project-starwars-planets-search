import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import NoResults from './NoResults';
// import NoResults from './NoResults';
import './Table.css';

export default function Table() {
  const {
    setFilter, filters, filteredData: planets,
  } = useContext(PlanetsContext);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [copyFilters, setCopyFilters] = useState(filters);

  const handleChange = ({ target: { name, value } }) => {
    if (name !== 'name') {
      setCopyFilters({
        ...copyFilters,
        filterByNumericValues: [
          { ...copyFilters.filterByNumericValues[0],
            [name]: value,
          },
        ],
      });
    } else {
      setFilter({
        ...filters,
        filterByName: {
          ...filters.filterByName,
          [name]: value,
        },
      });
    }
  };

  const table = () => {
    const [planet1] = planets;

    if (!planets.length) return <NoResults />;

    const columns = Object.keys(planet1);
    const values = planets.map((planet) => Object.values(planet));

    return (
      <>
        <div>
          <select
            data-testid="column-filter"
            name="column"
            onChange={ handleChange }
          >

            <option value="">Filtrar por coluna</option>

            {options.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}

          </select>
        </div>

        <div>
          <select
            onChange={ handleChange }
            data-testid="comparison-filter"
            name="comparison"
          >
            <option value="">Tipo de filtro</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>

        <div>
          <input
            className="valueFilter"
            name="value"
            type="number"
            data-testid="value-filter"
            onChange={ handleChange }
          />

          <div>
            <button
              type="button"
              data-testid="button-filter"
              onClick={ () => setFilter(copyFilters) }
            >
              Pesquisar
            </button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              {columns.map((key) => <th key={ key }>{key}</th>)}
            </tr>
          </thead>

          <tbody>
            {values.map((planetValues, index) => (
              <tr key={ planetValues[index] }>
                {planetValues.map((value) => <td key={ value }>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <h1>Welcome to StarWars planets search</h1>
      <input
        className="nameFilter"
        type="search"
        name="name"
        data-testid="name-filter"
        placeholder="Filter by Name"
        onChange={ handleChange }
      />
      {table()}
    </>
  );
}
