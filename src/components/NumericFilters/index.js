import React, { useState } from 'react';
import useNumericFilter from '../../hooks/useNumericFilters';

function NumericFilters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('larger');
  const [numericSearchTerm, setNumericSearchTerm] = useState('0');
  const { setNumericFilter } = useNumericFilter();

  const setNewNumFilter = () => {
    const newFilter = {
      column,
      comparison,
      numericSearchTerm,
    };
    setNumericFilter(newFilter);
  };

  return (
    <>
      <select
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
        name="column"
        id="column"
        value={ column }
      >
        <option value="population">População</option>
        <option value="orbital_period">Período Orbital</option>
        <option value="diameter">Diametro</option>
        <option value="rotation_period">Período de Rotação</option>
        <option value="surface_water">Água na Superfície</option>
      </select>
      <select
        onChange={ (e) => setComparison(e.target.value) }
        data-testid="comparison-filter"
        name="comparison"
        id="comparison"
        value={ comparison }
      >
        <option value="larger">Maior que</option>
        <option value="equals">Igual a</option>
        <option value="less">Menor que</option>
      </select>
      <input
        type="text"
        onChange={ (e) => setNumericSearchTerm(e.target.value) }
        data-testid="value-filter"
        name="value"
        id="value"
        value={ numericSearchTerm }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ setNewNumFilter }
      >
        Incluir Filtro
      </button>
    </>
  );
}

export default NumericFilters;
