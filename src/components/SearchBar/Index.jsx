import React, { useContext, useState } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';
import Filters from './Filters';

const COLUMNS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const COMPARISON = ['maior que', 'menor que', 'igual a'];

function SearchBar() {
  const { setText, name, filters,
    setFilterByNumericValues } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const searchButton = (() => {
    setFilterByNumericValues([...filterByNumericValues, { column, comparison, value }]);
  });
  function attFilters() {
    return (
      COLUMNS
        .filter((colu) => filterByNumericValues.every((a) => colu !== a.column))
        .map((col) => (
          <option key={ col }>
            { col }
          </option>
        )));
  }

  return (
    <main>
      <section>
        <input
          data-testid="name-filter"
          onChange={ (e) => setText(e.target.value) }
          placeholder="Pesquise"
          type="text"
          value={ name }
        />
      </section>
      <section>
        <select
          data-testid="column-filter"
          onChange={ (e) => setColumn(e.target.value) }
          value={ column }
        >
          { attFilters() }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparison(target.value) }
          value={ comparison }
        >
          { COMPARISON.map((comp) => (
            <option key={ comp }>
              { comp }
            </option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => setValue(target.value) }
          value={ value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ searchButton }
        >
          Filtrar
        </button>
      </section>
      <Filters />
    </main>
  );
}

export default SearchBar;
