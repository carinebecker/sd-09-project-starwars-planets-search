import React from 'react';
import useFilterByName from '../hooks/useFilterByName';
import useFilterByNumericValues from '../hooks/useFilterByNumericValues';

function FilterName() {
  const [name, setName] = useFilterByName('');
  const [
    fields,
    selectColumn,
    handleChangeFields,
    handleSubmitFilter,
  ] = useFilterByNumericValues({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  return (
    <div className="row">
      <div>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Procure um planeta"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
        />
      </div>
      <form onSubmit={ handleSubmitFilter }>
        <div>
          <select
            name="column"
            id="column-filter"
            data-testid="column-filter"
            value={ fields.column }
            onChange={ (event) => handleChangeFields(event.target) }
          >
            {selectColumn.map(({ option, enabled }) => (
              enabled && (<option key={ option } value={ option }>{option}</option>)
            ))}
          </select>
          <select
            name="comparison"
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ fields.comparison }
            onChange={ (event) => handleChangeFields(event.target) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            name="value"
            id="value-filter"
            data-testid="value-filter"
            min="0"
            value={ fields.value }
            onChange={ (event) => handleChangeFields(event.target) }
          />
          <button type="submit" data-testid="button-filter">
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterName;
