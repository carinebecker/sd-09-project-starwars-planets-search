import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import NoResults from './NoResults';
// import NoResults from './NoResults';
import './Table.css';

export default function Table() {
  const {
    setFilter, filters, filteredData: planets,
  } = useContext(PlanetsContext);

  const [filterColumns, setFilterColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [comparisons, setComparisons] = useState([
    'menor que',
    'igual a',
    'maior que',
  ]);

  const [copyFilters, setCopyFilters] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    if (name !== 'name') {
      setCopyFilters({
        ...copyFilters,
        [name]: value,
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

  const handleClick = () => {
    // setColumns(filterColumns.filter((column) => column !== value));
    const { column, comparison } = copyFilters;
    setFilter({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        copyFilters,
      ].filter((obj) => obj.column.length > 0),
    });

    setFilterColumns(filterColumns.filter((col) => column !== col));

    setComparisons(comparisons.filter((comp) => comparison !== comp));
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

            {/* <option value="">Filtrar por coluna</option> */}

            {filterColumns.map((column) => (
              <option key={ column } value={ column }>
                {column}
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

            {comparisons.map((comparison) => (
              <option key={ comparison } value={ comparison }>
                {comparison}
              </option>
            ))}
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
              onClick={ handleClick }
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
