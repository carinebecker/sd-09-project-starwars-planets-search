import React, { useContext } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';

const COLUMNS = ['', 'population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const COMPARISON = ['', 'maior que', 'menor que', 'igual a'];

function SearchBar() {
  const { setText, name, setColumn, column, setComparison,
    comparison, setValue, value, searchButton } = useContext(StarWarsContext);

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
          { COLUMNS.map((col) => (
            <option key={ col }>
              { col }
            </option>
          ))}
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
    </main>
  );
}

export default SearchBar;
